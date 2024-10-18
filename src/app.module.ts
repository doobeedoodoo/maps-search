import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { TomTomModule } from './integrations/tomtom/tomtom.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SearchModule,
    TomTomModule,
  ],
})
export class AppModule {}
