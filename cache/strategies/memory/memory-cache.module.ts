import { Module } from '@nestjs/common';
import { MemoryCacheStrategy } from './memory-cache.strategy';
import { KeyvOfflineModule } from './keyv-offline-cache.module';

@Module({
  imports: [KeyvOfflineModule],
  providers: [MemoryCacheStrategy],
  exports: [MemoryCacheStrategy],
})
export class MemoryCacheModule {}
