import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchParametersDto, SearchOptionsDto } from './dto';
import { SearchResponse } from './types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  internalServerErrorSchema,
  invalidSearchSchema,
  resourceForbiddenSchema,
  successSchema,
} from './schema';
import { ResponseInterceptor } from 'src/interceptors';

@Controller('search')
@UseInterceptors(ResponseInterceptor)
export class SearchController {
  constructor(private searchService: SearchService) {}

  @ApiTags('search')
  @ApiOperation({ summary: 'Search address' })
  @ApiResponse({
    status: 200,
    description: 'Search successful',
    schema: successSchema,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid search',
    schema: invalidSearchSchema,
  })
  @ApiResponse({
    status: 403,
    description: 'Accessing the resource is forbidden',
    schema: resourceForbiddenSchema,
  })
  @ApiResponse({
    status: 500,
    description: 'Application failed to process the request',
    schema: internalServerErrorSchema,
  })
  @Get(':searchQuery')
  async search(
    @Param() searchParameters: SearchParametersDto,
    @Query() options: SearchOptionsDto,
  ): Promise<SearchResponse[]> {
    const { searchQuery } = searchParameters;

    const searchResponse: SearchResponse[] = await this.searchService.search({
      searchQuery,
      options,
    });

    return searchResponse;
  }
}
