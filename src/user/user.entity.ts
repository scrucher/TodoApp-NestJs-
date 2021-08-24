import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
//import * as uuid from 'uuid';
import * as bcrypt from 'bcrypt';
import { Todo } from 'src/todo/todo.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  static todos(
    arg0: (type: any) => typeof User,
    post: any,
    arg2: { eager: false },
  ) {
    throw new Error('Method Implemented');
  }
  /*@BeforeInsert() genarate() {
    this.id = uuid();
  }*/
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @OneToMany(type => Todo, todos => todos.user, { eager: true })
  todos: Todo;
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
