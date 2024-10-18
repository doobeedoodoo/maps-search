import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TomTomModule } from 'src/integrations/tomtom/tomtom.module';

@Module({
  imports: [TomTomModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
