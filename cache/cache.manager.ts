import { Injectable } from '@nestjs/common';
import { MemoryCacheStrategy } from './strategies/memory/memory-cache.strategy';
import { RedisCacheStrategy } from './strategies/redis/redis-cache.strategy';
import { ICacheStrategy } from './strategies/cache-strategy.interface';

@Injectable()
export class CacheManager implements ICacheStrategy {
  public memory: MemoryCacheStrategy;
  public redis: RedisCacheStrategy;

  constructor(
    memoryCache: MemoryCacheStrategy,
    redisCache: RedisCacheStrategy,
  ) {
    this.memory = memoryCache;
    this.redis = redisCache;
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.redis.get(key);
  }

  async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    return this.redis.set(key, value, ttlMs);
  }

  async delete(key: string): Promise<void> {
    return this.redis.delete(key);
  }

  async clear(): Promise<void> {
    return this.redis.clear();
  }
}
