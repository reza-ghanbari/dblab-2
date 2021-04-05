import { PersonDto } from './dto/person.dto';
import { HelloService } from './hello.service';
import { Body, Controller, Get, Header, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloServie: HelloService) {}

  @Header('Content-type', 'application/json')
  @ApiResponse({ status: 200, description: 'Say Hello!' })
  @ApiTags('hello')
  @Post('welcome')
  @Header('Content-type', 'application/json')
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
  async sayWelcome2(@Query('name') iName, @Query('year') iYear) {
    const msg = await this.helloServie.welcome({ name: iName, year: iYear });
    return { data: msg };
  }
}
