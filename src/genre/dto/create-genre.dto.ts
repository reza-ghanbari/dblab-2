import { ApiProperty } from '@nestjs/swagger';

export default class CreateGenreDto {
  @ApiProperty({
    description: 'type name',
    type: String,
    example: 'Historic',
  })
  readonly type: string;
}
