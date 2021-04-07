import { AuthGuard } from '@nestjs/passport';
import { PersonDto } from './dto/person.dto';
import { HelloService } from './hello.service';
import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloServie: HelloService) {}

  @Header('Content-type', 'application/json')
  @ApiResponse({ status: 200, description: 'Say Hello!' })
  @ApiTags('hello')
  @Post('welcome')
  @Header('Content-type', 'application/json')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async sayWelcome(@Body() personDto: PersonDto): Promise<{ data: string }> {
    const msg = await this.helloServie.welcome(personDto);
    return { data: msg };
  }

  @ApiResponse({ status: 200 })
  @ApiQuery({ name: 'name', required: true, type: String })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: 'you can ignore this',
  })
  @ApiTags('hello')
  @Get('welcome')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async sayWelcome2(@Query('name') iName, @Query('year') iYear) {
    const msg = await this.helloServie.welcome({ name: iName, year: iYear });
    return { data: msg };
  }
}
