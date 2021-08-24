import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  body: string;
  @Column()
  priority: string;
  @Column()
  status: string;
  @ManyToOne((type) => User, (user) => user.todos, { eager: false })
  user: User;
}
