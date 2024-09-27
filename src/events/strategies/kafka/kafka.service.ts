import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Message } from 'kafkajs';
import { IProducer } from '../interfaces/producer.interface';
import { ProducePayload } from '../types/payload.types';
import { KAFKA_PRODUCER } from './kafka.producer.module';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();

  constructor(
    @Inject(KAFKA_PRODUCER)
    private readonly createProducer: (topic: string) => IProducer,
  ) {}

  async produce(message: ProducePayload) {
    const producer = await this.getProducer(message?.type);

    const kafkaMessage: Message = {
      key: message.type,
      value: JSON.stringify(message.payload),
    };

    await producer.produce(kafkaMessage);
  }

  private async getProducer(topic: string): Promise<IProducer> {
    let producer = this.producers.get(topic);

    if (!producer) {
      producer = this.createProducer(topic);
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown() {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
