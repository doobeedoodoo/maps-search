import { Injectable } from '@nestjs/common';
import { TomTomService } from '../integrations/tomtom/tomtom.service';
import { mapSearchResponse as mapSearchResponse } from './mappers';
import { SearchRequest } from './types';

@Injectable({})
export class SearchService {
  constructor(private readonly tomTomService: TomTomService) {}

  async search({ searchQuery, options }: SearchRequest) {
    const searchResponse = await this.tomTomService.search({
      searchQuery,
      options,
    });

    return mapSearchResponse(searchResponse);
  }
}
