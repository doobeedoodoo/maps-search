import { Global, Module } from '@nestjs/common';
import { MapsService } from './maps.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}
