import { UserService } from './user.service';
import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'returns created user' })
  @ApiTags('user')
  @Post('post')
  postUser(@Body() user: CreateUserDto) {
    return this.userService.insert(user);
  }

  @ApiResponse({
    status: 200,
    description: 'get list of all users',
    isArray: true,
  })
  @ApiTags('user')
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiResponse({
    status: 200,
    description: 'returns list of books of a user',
    isArray: true,
  })
  @ApiTags('user')
  @Get('books')
  getBooks(@Body('userId', ParseIntPipe) userId: number) {
    return this.userService.getBooksOFUser(userId);
  }
}
