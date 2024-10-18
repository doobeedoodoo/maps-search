import { Global, Module } from '@nestjs/common';
import { TomTomService } from './tomtom.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [TomTomService],
  exports: [TomTomService],
})
export class TomTomModule {}
