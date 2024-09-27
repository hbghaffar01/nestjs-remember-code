import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICacheStrategy } from '../cache-strategy.interface';
import Keyv from 'keyv';
import { KEYV_REDIS } from './keyv-redis-cache.module';

@Injectable()
export class RedisCacheStrategy implements ICacheStrategy {
  constructor(@Inject(KEYV_REDIS) private cache: Keyv) {}

  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await this.cache.get(key);
    } catch (error) {
      Logger.error(`Failed to get memory cache for key: ${key}`, error.stack);
      throw error;
    }
  }

  async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    try {
      await this.cache.set(key, value, ttlMs);
    } catch (error) {
      Logger.error(`Failed to set memory cache for key: ${key}`, error.stack);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.cache.delete(key);
    } catch (error) {
      Logger.error(
        `Failed to delete memory cache for key: ${key}`,
        error.stack,
      );
      throw error;
    }
  }

  async clear(): Promise<void> {
    try {
      await this.cache.clear();
    } catch (error) {
      Logger.error('Failed to clear memory cache', error.stack);
      throw error;
    }
  }
}
