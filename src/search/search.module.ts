import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TomTomModule } from '../integrations/tomtom/tomtom.module'; // TODO: consider ts config paths

@Module({
  imports: [TomTomModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
