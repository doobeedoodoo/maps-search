import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { MapsModule } from './integrations/maps/maps.module';
import { ConfigModule } from '@nestjs/config';
// TODO: swagger
// TODO: add logging
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SearchModule, MapsModule],
})
export class AppModule {}
