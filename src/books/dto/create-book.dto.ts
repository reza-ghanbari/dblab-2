import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
  @ApiProperty({
    description: 'name of the book',
    type: String,
    example: 'Divan of Hafez',
  })
  readonly name: string;
  @ApiProperty({ description: 'id of owner >', type: Number })
  readonly userId: number;
  @ApiProperty({ description: 'genre ids >', type: [Number] })
  readonly genreIds: number[];
}
