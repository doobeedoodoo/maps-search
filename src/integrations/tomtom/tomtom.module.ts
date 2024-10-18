import { Global, Module } from '@nestjs/common';
import { TomTomService } from './tomtom.service';

@Global()
@Module({
  providers: [TomTomService],
  exports: [TomTomService],
})
export class TomTomModule {}
