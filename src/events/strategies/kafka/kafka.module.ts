import { Module } from '@nestjs/common';
import { ProducerService } from './kafka.service';
import { KafkaProducerModule } from './kafka.producer.module';

@Module({
  imports: [KafkaProducerModule],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class KafkaModule {}
