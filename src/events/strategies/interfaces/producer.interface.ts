import { Message } from 'kafkajs';

export interface IProducer {
  produce(message: Message): Promise<void>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
