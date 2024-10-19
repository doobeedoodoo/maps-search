import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchParametersDto, SearchOptionsDto } from './dto';
import { JsonApiSearchResponse, SearchResponse } from './types';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiTags('search')
  @ApiOperation({ summary: 'Search address' })
  @ApiResponse({
    status: 200,
    description: 'Search successful',
  })
  @ApiResponse({ status: 400, description: 'Invalid query provided' })
  @ApiResponse({
    status: 403,
    description: 'Accessing the resource is forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Application failed to process the request',
  })
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
