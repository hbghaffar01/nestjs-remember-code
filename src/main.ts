import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, VersioningType } from '@nestjs/common';
import { Request } from 'express';
import { ConfigurationService } from './configuration/configuration.service';
import { AppLoggerService } from './logger/logger.service';
import { RequestLoggingInterceptor } from './http/logging.interceptor';
import { AllExceptionsFilter } from './http/exceptions.filter';
import helmet from 'helmet';
import * as compression from 'compression';

function setupSecurity(
  app: INestApplication,
  configurationService: ConfigurationService,
) {
  app.use(helmet());
  app.use(compression());
  app.enableCors(configurationService.corsConfig);
}

function setupSwagger(
  app: INestApplication,
  configurationService: ConfigurationService,
) {
  const config = new DocumentBuilder()
    .setTitle('Voo Payment Retails APIs')
    .setDescription('Retails APIs for Voo Payment System')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  document.servers.push({ url: configurationService.serviceSubPath });

  SwaggerModule.setup(
    `${configurationService.serviceSubPath}/:version/docs`,
    app,
    document,
    {
      swaggerUiEnabled: !configurationService.isProduction,
      patchDocumentOnRequest: (req, _res, document) => {
        const copyDocument = JSON.parse(JSON.stringify(document));
        const version = (req as Request).params.version;

        for (const route in document.paths) {
          if (route.startsWith(`/${version}`) || /\/health$/gi.test(route)) {
            continue;
          }
          delete copyDocument.paths[route];
        }

        return copyDocument;
      },
    },
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configurationService =
    app.get<ConfigurationService>(ConfigurationService);

  // Logger
  const loggerService = app.get<AppLoggerService>(AppLoggerService);
  app.useLogger(loggerService);

  // Security
  setupSecurity(app, configurationService);

  // Basic Application Settings
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1.0' });
  app.useGlobalInterceptors(new RequestLoggingInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix(configurationService.serviceSubPath);

  // Docs
  setupSwagger(app, configurationService);

  // Spin the server
  await app.listen(3000);
}
bootstrap();
