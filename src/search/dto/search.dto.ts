import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchParametersDto {
  @IsNotEmpty()
  @IsString()
  searchQuery: string;
}

export class SearchOptionsDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit: number;
}
