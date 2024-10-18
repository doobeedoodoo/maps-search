import { SearchOptionsDto } from '../dto/search.dto';

export type SearchRequest = {
  searchQuery: string;
  options: SearchOptionsDto;
};
