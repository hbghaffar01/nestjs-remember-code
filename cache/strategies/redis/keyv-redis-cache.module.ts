import { Module } from '@nestjs/common';
import KeyvRedis from '@keyv/redis';
import Keyv from 'keyv';
import { ConfigurationService } from '../../../configuration/configuration.service';

export const KEYV_REDIS = 'KEYV_REDIS';

@Module({
  providers: [
    {
      provide: KEYV_REDIS,
      useFactory: async (configurationService: ConfigurationService) => {
        const redisUri = configurationService.redisUri;
        const redisStore = new KeyvRedis(redisUri);
        return new Keyv({ store: redisStore });
      },
      inject: [ConfigurationService],
    },
  ],
  exports: [KEYV_REDIS],
})
export class KeyvRedisModule {}
