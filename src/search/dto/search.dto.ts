import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SearchParametersDto {
  @ApiProperty({
    example: '1 charlotte street',
    description: 'The search query',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  searchQuery: string;
}

export class SearchOptionsDto {
  @ApiPropertyOptional({
    example: '100',
    description: 'The maximum number of search results returned',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
