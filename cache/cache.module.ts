import { Module } from '@nestjs/common';
import { MemoryCacheModule } from './strategies/memory/memory-cache.module';
import { RedisCacheModule } from './strategies/redis/redis-cache.module';
import { CacheManager } from './cache.manager';

@Module({
  imports: [MemoryCacheModule, RedisCacheModule],
  providers: [CacheManager],
  exports: [CacheManager],
})
export class CacheModule {}
