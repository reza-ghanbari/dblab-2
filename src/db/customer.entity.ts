import { Max, Min } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProjectEntity from './project.enity';

@Entity()
export default class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true })
  username: string;

  @Column()
  password: string;

  @Min(0.0)
  @Max(5.0)
  @Column('real')
  rank: number;

  @OneToMany((type) => ProjectEntity, (project) => project.owner)
  submittedProjects: ProjectEntity[];

  @Column()
  type: 'freelancer' | 'owner';
}
