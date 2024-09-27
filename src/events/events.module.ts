import { Module } from '@nestjs/common';
import { KafkaModule } from './strategies/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
})
export class ServiceModule {}
