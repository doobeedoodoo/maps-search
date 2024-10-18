import { Injectable } from '@nestjs/common';
import { SearchOptionsDto, SearchQueryDto } from './dto';

// TODO: put in a types file

@Injectable({})
export class SearchService {
  search({
    searchQuery: searchQuery,
    options,
  }: {
    searchQuery: SearchQueryDto;
    options: SearchOptionsDto;
  }) {
    return { data: { query: searchQuery, options } };
  }
}
