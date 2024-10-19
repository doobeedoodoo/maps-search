import { Injectable } from '@nestjs/common';
import { MapsService } from '../integrations/maps/maps.service';
import { mapSearchResponse as mapSearchResponse } from './mappers';
import { SearchRequest, SearchResponse } from './types';

@Injectable({})
export class SearchService {
  constructor(private readonly mapsService: MapsService) {}

  async search({
    searchQuery,
    options,
  }: SearchRequest): Promise<SearchResponse[]> {
    const searchResponse = await this.mapsService.search({
      searchQuery,
      options,
    });

    return mapSearchResponse(searchResponse);
  }
}
