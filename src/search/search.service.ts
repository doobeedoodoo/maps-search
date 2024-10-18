import { Injectable } from '@nestjs/common';
import { SearchOptionsDto } from './dto';
import { TomTomService } from 'src/integrations/tomtom/tomtom.service';

// TODO: put in a types file

@Injectable({})
export class SearchService {
  constructor(private readonly tomTomService: TomTomService) {}
  async search({
    searchQuery,
    options,
  }: {
    searchQuery: string;
    options: SearchOptionsDto;
  }) {
    const response = await this.tomTomService.search({ searchQuery, options });
    return response;
  }
}
