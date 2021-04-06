import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BooksService } from 'src/books/books.service';
import BookEntity from 'src/db/book.entity';
import UserEntity from 'src/db/user.entity';
import { DeleteResult } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UserService {
  // private bookService: BooksService;
  constructor(private readonly bookService: BooksService) {}

  // onModuleInit() {
  //   this.bookService = this.moduleRef.get(BooksService);
  // }

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity = UserEntity.create();
    const { name } = userDetails;
    userEntity.name = name;
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
    const userEntity = UserEntity.create({ name: userDetails?.name, id: id });
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
