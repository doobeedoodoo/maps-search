import { SearchOptionsDto } from '../dto/search.dto';

export type SearchRequest = {
  searchQuery: string;
  options: SearchOptionsDto;
};

export type SearchResponse = {
  placeId: string;
  freeformAddress: string | null;
  streetNumber: string | null;
  municipality: string | null;
  countryCode: string | null;
  country: string | null;
};

export type JsonApiSearchResponse = {
  meta: {
    query: string;
    count: number;
  };
  data: SearchResponse[];
};
