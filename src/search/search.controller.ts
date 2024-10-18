import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchParametersDto, SearchOptionsDto } from './dto';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get(':searchQuery')
  async search(
    @Param() searchParameters: SearchParametersDto,
    @Query() options: SearchOptionsDto,
  ) {
    const { searchQuery } = searchParameters;
    console.log({ searchQuery, options });
    return await this.searchService.search({
      searchQuery,
      options,
    });
  }
}
