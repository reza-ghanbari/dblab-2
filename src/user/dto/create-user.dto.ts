import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    description: 'name of user > ',
    type: String,
    example: 'reza',
  })
  readonly name?: string;
  @ApiProperty({ description: 'id of books that they own', type: [Number] })
  readonly books?: number[];
}
