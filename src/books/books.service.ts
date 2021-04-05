import { Injectable } from '@nestjs/common';
import BookEntity from 'src/db/book.entity';
import GenreEntity from 'src/db/genre.entity';
import UserEntity from 'src/db/user.entity';
import CreateBookDto from './dto/create-book.dto';

@Injectable()
export class BooksService {
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

  async getAll(): Promise<BookEntity[]> {
    return BookEntity.find();
  }
}
