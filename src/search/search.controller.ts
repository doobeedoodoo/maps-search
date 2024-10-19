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
    schema: {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              example: '1 charlotte street',
            },
            count: {
              type: 'number',
              example: 100,
            },
          },
        },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              placeId: {
                type: 'string',
                example: 'dK02J2NUGekCcSf9MtpuOA',
              },
              freeformAddress: {
                type: 'string',
                example: '1 Charlotte Street, Sunshine West, VIC, 3020',
              },
              streetNumber: {
                type: 'string',
                example: '1',
              },
              municipality: {
                type: 'string',
                example: 'Melbourne',
              },
              countryCode: {
                type: 'string',
                example: 'AU',
              },
              country: {
                type: 'string',
                example: 'Australia',
              },
            },
          },
        },
      },
    },
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
