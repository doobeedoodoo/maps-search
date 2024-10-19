import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchParametersDto, SearchOptionsDto } from './dto';
import { JsonApiSearchResponse, SearchResponse } from './types';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get(':searchQuery')
  async search(
    @Param() searchParameters: SearchParametersDto,
    @Query() options: SearchOptionsDto,
  ): Promise<JsonApiSearchResponse> {
    const { searchQuery } = searchParameters;
    console.log({ searchQuery, options });

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
