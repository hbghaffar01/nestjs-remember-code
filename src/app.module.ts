import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { MerchantModule } from './merchant/merchant.module';

@Module({
  imports: [ConfigurationModule, LoggerModule, UserModule, MerchantModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
