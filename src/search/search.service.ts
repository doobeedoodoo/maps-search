import { Injectable } from '@nestjs/common';
import { MapsService } from '../integrations/maps/maps.service';
import { mapSearchResponse as mapSearchResponse } from './mappers';
import { SearchRequest } from './types';

@Injectable({})
export class SearchService {
  constructor(private readonly mapsService: MapsService) {}

  async search({ searchQuery, options }: SearchRequest) {
    const searchResponse = await this.mapsService.search({
      searchQuery,
      options,
    });

    return mapSearchResponse(searchResponse);
  }
}
