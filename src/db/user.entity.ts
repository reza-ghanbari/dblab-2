import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BookEntity from './book.entity';

@Entity()
export default class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  name: string;

  @OneToMany((type) => BookEntity, (book) => book.user)
  books: BookEntity[];
}
