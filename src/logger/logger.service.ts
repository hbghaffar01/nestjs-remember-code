import { Injectable, LoggerService } from '@nestjs/common';
import { PinoLoggerService } from './pino.service';

@Injectable()
export class AppLoggerService implements LoggerService {
  constructor(private readonly pinoLoggerService: PinoLoggerService) {}

  log(message: string, context?: string) {
    this.pinoLoggerService.log(message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.pinoLoggerService.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.pinoLoggerService.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.pinoLoggerService.debug(message, context);
  }

  verbose(message: string, context?: string) {
    this.pinoLoggerService.verbose(message, context);
  }
}
