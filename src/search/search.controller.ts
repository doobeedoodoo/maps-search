import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchParametersDto, SearchOptionsDto } from './dto';
import { JsonApiSearchResponse, SearchResponse } from './types';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get(':searchQuery')
  @UseFilters(HttpExceptionFilter)
  async search(
    @Param() searchParameters: SearchParametersDto,
    @Query() options: SearchOptionsDto,
  ): Promise<JsonApiSearchResponse> {
    const { searchQuery } = searchParameters;

    const searchResponse: SearchResponse[] = await this.searchService.search({
      searchQuery,
      options,
    });

    return {
      meta: {
        query: searchParameters.searchQuery,
        count: searchResponse.length,
      },
      data: searchResponse,
    };
  }
}
