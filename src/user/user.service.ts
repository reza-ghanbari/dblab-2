import { Injectable } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import BookEntity from 'src/db/book.entity';
import UserEntity from 'src/db/user.entity';
import { DeleteResult } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly bookService: BooksService) {}

  async getUserByName(username: string): Promise<UserEntity> {
    return await UserEntity.findOne({ where: { name: username } });
  }

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity = UserEntity.create();
    const { name, password } = userDetails;
    userEntity.name = name;
    userEntity.password = password;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getBooksOFUser(userId: number): Promise<BookEntity[]> {
    const user = await UserEntity.findOne({
      where: { id: userId },
      relations: ['books'],
    });
    return user?.books;
  }

  async getUser(id: number) {
    return await UserEntity.findOne({
      where: { id: id },
      relations: ['books'],
    });
  }

  async updateUser(
    userDetails: CreateUserDto,
    id: number,
  ): Promise<UserEntity> {
    const userEntity = UserEntity.create({
      name: userDetails?.name,
      id: id,
      password: userDetails?.password,
    });
    const books = await this.bookService.getBooks(userDetails?.books);
    if (books) userEntity.books = books;
    return await UserEntity.save(userEntity);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    const user = await UserEntity.findOne({
      where: { id: id },
      relations: ['books'],
    });
    for (const book of user.books) {
      await this.bookService.deleteBook(book.id);
    }
    return await UserEntity.delete(id);
  }
}
