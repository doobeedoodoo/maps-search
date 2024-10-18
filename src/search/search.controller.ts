import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchQueryDto, SearchOptionsDto } from './dto';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get(':searchQuery')
  search(
    @Param() searchQuery: SearchQueryDto,
    @Query() options: SearchOptionsDto,
  ) {
    console.log({ searchParameter: searchQuery, queries: options });
    return this.searchService.search({ searchQuery, options });
  }
}
