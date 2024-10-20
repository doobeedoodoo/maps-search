import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { MapsModule } from './integrations/maps/maps.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    SearchModule,
    MapsModule,
  ],
})
export class AppModule {}
