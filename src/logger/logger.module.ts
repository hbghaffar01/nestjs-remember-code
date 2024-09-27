import { Module } from '@nestjs/common';
import { AppLoggerService } from './logger.service';
import { PinoLoggerService } from './pino.service';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [AppLoggerService, PinoLoggerService],
  exports: [AppLoggerService],
})
export class LoggerModule {}
