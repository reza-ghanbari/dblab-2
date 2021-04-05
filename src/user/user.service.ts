import { Injectable } from '@nestjs/common';
import BookEntity from 'src/db/book.entity';
import UserEntity from 'src/db/user.entity';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class UserService {
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
    return user.books;
  }
}
