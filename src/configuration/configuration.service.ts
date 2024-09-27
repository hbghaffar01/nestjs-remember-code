import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerConfig } from '../logger/logger.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  get serviceSubPath() {
    return this.configService.getOrThrow('SERVICE_SUBPATH');
  }

  get isProduction() {
    return this.configService.getOrThrow('NODE_ENV').toString() === 'true';
  }

  get buildTag() {
    return this.configService.getOrThrow('BUILD_TAG');
  }

  get currentVersion() {
    return ['v1.0'];
  }

  get kafkaBroker() {
    return this.configService.getOrThrow('KAFKA_BROKER');
  }

  get loggerConfig(): ILoggerConfig {
    return {
      logDir: this.configService.get<string>('LOG_DIR', 'logs'),
      logFileName: this.configService.get<string>('LOG_FILE_NAME', 'app.log'),
      logRotateInterval: this.configService.get<string>(
        'LOG_ROTATE_INTERVAL',
        '1d',
      ),
      logRotationMaxSize: this.configService.get<string>(
        'LOG_ROTATION_MAX_SIZE',
        '20M',
      ),
      logRotationCompress: this.configService.get<string>(
        'LOG_ROTATION_COMPRESS',
        'gzip',
      ),
      logLevel: this.configService.get<string>(
        'LOG_LEVEL',
        this.isProduction ? 'info' : 'debug',
      ),
    };
  }

  get corsConfig(): CorsOptions {
    const defaultMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
    const defaultHeaders = 'Content-Type, Accept, Authorization';

    return {
      origin: this.configService.get('CORS_ORIGIN', '*'),
      methods: this.configService.get('CORS_METHODS', defaultMethods),
      allowedHeaders: this.configService.get('CORS_HEADERS', defaultHeaders),
      credentials: false,
      optionsSuccessStatus: 204,
    };
  }
}
