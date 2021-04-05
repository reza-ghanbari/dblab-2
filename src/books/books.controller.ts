import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @ApiResponse({
    status: 201,
    description: 'returns the currently created book',
  })
  @ApiTags('book')
  @Post()
  async postBook(@Body() book: CreateBookDto) {
    return this.bookService.insert(book);
  }

  @ApiResponse({ status: 200, description: 'returns all books', isArray: true })
  @ApiTags('book')
  @Get()
  async getAll() {
    return this.bookService.getAll();
  }
}
