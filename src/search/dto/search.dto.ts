import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchParametersDto {
  @ApiProperty({
    example: 'charlotte street',
    description: 'The search query',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  searchQuery: string;
}

export class SearchOptionsDto {
  @ApiProperty({
    example: '100',
    description: 'The maximum number of search results returned',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
