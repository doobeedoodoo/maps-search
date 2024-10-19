import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MapsModule } from '../integrations/maps/maps.module'; // TODO: consider ts config paths

@Module({
  imports: [MapsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
