import CustomerEntity from './customer.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class ProjectEntity extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column()
  deadline: string;

  @ManyToOne((type) => CustomerEntity, (customer) => customer.submittedProjects)
  owner: CustomerEntity;

  @ManyToMany((type) => CustomerEntity)
  @JoinTable()
  requests: CustomerEntity[];
}
