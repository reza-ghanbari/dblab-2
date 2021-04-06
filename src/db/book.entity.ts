import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import GenreEntity from './genre.entity';
import UserEntity from './user.entity';

@Entity()
export default class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @ManyToOne((type) => UserEntity, (user) => user.books)
  user: UserEntity;

  @ManyToMany((type) => GenreEntity)
  @JoinTable()
  genres: GenreEntity[];
}
