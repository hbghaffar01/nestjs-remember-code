import { Module } from '@nestjs/common';
import { KafkajsProducer } from './kafka.producer';
import { ConfigurationService } from '../../../configuration/configuration.service';

export const KAFKA_PRODUCER = 'KAFKA_PRODUCER';

@Module({
  providers: [
    {
      provide: KAFKA_PRODUCER,
      useFactory: (configService: ConfigurationService) => {
        return (topic: string) =>
          new KafkajsProducer(topic, configService.kafkaBroker);
      },
      inject: [ConfigurationService],
    },
  ],
  exports: [KAFKA_PRODUCER],
})
export class KafkaProducerModule {}
