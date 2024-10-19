import { SearchOptionsDto } from '../dto/search.dto';

export type SearchRequest = {
  searchQuery: string;
  options: SearchOptionsDto;
};

export type SearchResponse = {
  placeId: string;
  freeformAddress: string;
  streetNumber: string | null;
  municipality: string;
  countryCode: string;
  country: string;
};

export type JsonApiSearchResponse = {
  meta: {
    query: string;
    count: number;
  };
  data: SearchResponse[];
};
