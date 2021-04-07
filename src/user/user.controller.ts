import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, description: 'returns created user' })
  @ApiTags('user')
  @Post()
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiResponse({
    status: 200,
    description: 'returns list of books of a user',
    isArray: true,
  })
  @ApiTags('user')
  @Get(':id/books')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getBooks(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.getBooksOFUser(userId);
  }

  @ApiResponse({
    status: 200,
    description:
      'updates if user has already existed, otherwise creates new user',
  })
  @ApiTags('user')
  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Body() user: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(user, id);
  }

  @ApiResponse({
    status: 200,
    description: 'if id exists, it will remove it',
  })
  @ApiTags('user')
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
