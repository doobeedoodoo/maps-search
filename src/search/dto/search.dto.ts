import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchQueryDto {
  @IsNotEmpty()
  @IsString()
  searchQuery: string;
}

export class SearchOptionsDto {
  // TODO: should be a number. parse string to int?
  @IsOptional()
  limit: number;
}
