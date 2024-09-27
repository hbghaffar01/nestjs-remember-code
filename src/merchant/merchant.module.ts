import { Module } from '@nestjs/common';
import { ValidateController } from './merchant.controller';
import { ServiceModule } from '../events/events.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from '../events/strategies/kafka/kafka.module';

@Module({
  imports: [
    ServiceModule,
    KafkaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ValidateController],
  providers: [],
})
export class MerchantModule {}
