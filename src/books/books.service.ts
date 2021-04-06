import { GenreService } from './../genre/genre.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import BookEntity from 'src/db/book.entity';
import GenreEntity from 'src/db/genre.entity';
import UserEntity from 'src/db/user.entity';
import { DeleteResult } from 'typeorm';
import CreateBookDto from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly genreService: GenreService) {}

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name, userId, genreIds } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userId);
    book.genres = [];
    for (const id of genreIds) {
      book.genres.push(await GenreEntity.findOne(id));
    }
    await BookEntity.save(book);
    return book;
  }

  async getBooks(bookIds: number[]) {
    const books: BookEntity[] = [];
    if (!bookIds) {
      return;
    }
    for (const id of bookIds) {
      books.push(await BookEntity.findOne({ id }));
    }
    return books;
  }

  async getAll(): Promise<BookEntity[]> {
    return BookEntity.find();
  }

  async updateBook(book: CreateBookDto, id: number): Promise<BookEntity> {
    const bookEntity = BookEntity.create({
      name: book?.name,
      id: id,
    });
    bookEntity.genres = await this.genreService.getGenres(book?.genreIds);
    await BookEntity.save(bookEntity);
    return await BookEntity.findOne(id);
  }

  async deleteBook(id: number): Promise<DeleteResult> {
    return await BookEntity.delete(id);
  }
}
