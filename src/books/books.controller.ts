import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
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

  @ApiResponse({
    status: 200,
    description:
      'updates if book has already existed, otherwise creates new book',
  })
  @ApiTags('book')
  @Put(':id')
  updateBook(
    @Body() book: CreateBookDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookService.updateBook(book, id);
  }

  @ApiResponse({ status: 200, description: 'deletes a user if it exists' })
  @ApiTags('book')
  @Delete(':id')
  async deleteBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.deleteBook(id);
  }
}
