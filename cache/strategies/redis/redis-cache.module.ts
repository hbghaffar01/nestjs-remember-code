import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../configuration/configuration.module';
import { KeyvRedisModule } from './keyv-redis-cache.module';
import { RedisCacheStrategy } from './redis-cache.strategy';

@Module({
  imports: [ConfigurationModule, KeyvRedisModule],
  providers: [RedisCacheStrategy],
  exports: [RedisCacheStrategy],
})
export class RedisCacheModule {}
