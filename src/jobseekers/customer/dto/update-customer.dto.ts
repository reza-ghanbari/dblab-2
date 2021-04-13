import { ApiProperty } from '@nestjs/swagger';

export default class UpdateCustomerDto {
  @ApiProperty({
    description: 'customer username',
    type: String,
    example: 'reza',
  })
  username?: string;
  @ApiProperty({
    description: 'password of customer',
    type: String,
    example: 'password',
  })
  password?: string;
  @ApiProperty({
    description: 'rank of user, a number between 0 to 5',
    type: Number,
    example: 2.5,
  })
  rank?: number;
  @ApiProperty({
    description: " only gets two values: 'freelancer' and 'owner'",
    type: ['freelancer', 'owner'],
    example: 'freelancer',
  })
  type?: 'freelancer' | 'owner';
  @ApiProperty({
    description: 'id of projects that user has defined',
    type: [Number],
    example: [1],
  })
  projects?: number[];
}
