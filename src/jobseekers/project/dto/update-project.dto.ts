import { ApiProperty } from '@nestjs/swagger';

export default class UpdateProjectDto {
  @ApiProperty({
    description: 'name of project',
    type: String,
    example: 'a project',
  })
  readonly name?: string;
  @ApiProperty({
    description: 'password of user',
    type: String,
    example: 'a simple description',
  })
  readonly description?: string;
  @ApiProperty({
    description: 'budget of project',
    type: Number,
    example: 10000,
  })
  readonly budget?: number;
  @ApiProperty({
    description: 'deadline of project',
    type: String,
    example: '2021/5/10',
  })
  readonly deadline?: string;
  @ApiProperty({
    description: 'budget of project',
    type: Number,
    example: 1,
  })
  readonly owner?: number;
  @ApiProperty({
    description: "reuests of project(put freelancers' ids here)",
    type: [Number],
    example: [1, 2, 3],
  })
  readonly requests?: number[];

}
