import { Module } from '@nestjs/common';
import KeyvOffline from '@keyv/offline';
import Keyv from 'keyv';

export const KEYV_OFFLINE = 'KEYV_OFFLINE';

@Module({
  providers: [
    {
      provide: KEYV_OFFLINE,
      useFactory: () => new KeyvOffline(new Keyv()),
    },
  ],
  exports: [KEYV_OFFLINE],
})
export class KeyvOfflineModule {}
