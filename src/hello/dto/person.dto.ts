import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Length, IsOptional, Min, IsNumber } from 'class-validator';

export class PersonDto {
  @ApiProperty({
    description: 'Enter your Name > ',
    minLength: 3,
    default: 'Reza',
    maxLength: 10,
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(1960)
  @ApiPropertyOptional({
    description: 'Optional',
    default: 1998,
    minimum: 1960,
  })
  year: number;
}
