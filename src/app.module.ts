import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { TomTomModule } from './integrations/tomtom/tomtom.module';

@Module({
  imports: [SearchModule, TomTomModule],
})
export class AppModule {}
