import { pino, multistream } from 'pino';
import * as fs from 'fs';
import { createStream } from 'rotating-file-stream';
import { Injectable } from '@nestjs/common';
import { ILogger } from './logger.interface';
import { ConfigurationService } from '../configuration/configuration.service';
import PinoPretty from 'pino-pretty';
import { ILoggerConfig } from './logger.config';

@Injectable()
export class PinoLoggerService implements ILogger {
  private readonly logger: pino.Logger;

  constructor(private readonly configService: ConfigurationService) {
    this.logger = this.createLogger();
  }

  private createLoggerStreams(config: ILoggerConfig) {
    const streams: pino.DestinationStream[] = [];

    // File stream
    const fileStream = createStream(config.logFileName, {
      interval: config.logRotateInterval,
      path: config.logDir,
      size: config.logRotationMaxSize,
      compress: config.logRotationCompress,
    });
    streams.push(fileStream);

    // Create stdout stream if not production
    if (!this.configService.isProduction) {
      const prettyStream = PinoPretty({
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      });
      streams.push(prettyStream);
    }

    return streams;
  }

  private createLogger(): pino.Logger {
    const config = this.configService.loggerConfig;
    const logDir = config.logDir;

    // Ensure log directory exists
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    return pino(
      {
        level: config.logLevel,
        formatters: {
          level(label) {
            return { level: label };
          },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      multistream(this.createLoggerStreams(config)),
    );
  }

  log(message: string, context?: string) {
    this.logger.info({ context }, message);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error({ context, trace }, message);
  }

  warn(message: string, context?: string) {
    this.logger.warn({ context }, message);
  }

  debug?(message: string, context?: string) {
    this.logger.debug({ context }, message);
  }

  verbose?(message: string, context?: string) {
    this.logger.trace({ context }, message);
  }
}
