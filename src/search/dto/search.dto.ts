import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchParametersDto {
  @IsNotEmpty()
  @IsString()
  searchQuery: string;
}

export class SearchOptionsDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
