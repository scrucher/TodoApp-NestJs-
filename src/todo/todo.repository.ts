import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { FilterDto } from './filter.dto';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTask(todoDto: TodoDto): Promise<Todo> {
    const { title, body, priority, status } = todoDto;
    const todo = new Todo();
    todo.title = title;
    todo.body = body;
    todo.priority = priority;
    todo.status = status;
    await todo.save();
    if (!todo) {
      throw new InternalServerErrorException();
    }
    return todo;
  }
  async deleteTask(id: number): Promise<void> {
    const deleteTask = await this.delete(id);
    if (!deleteTask.affected) {
      throw new NotFoundException();
    }
  }
  async getTask(id: number): Promise<Todo> {
    const findTask = await this.findOne(id);
    if (!findTask) {
      throw new NotFoundException();
    }
    return findTask;
  }
  async getAll(filterDto: FilterDto): Promise<Todo[]> {
    const { priority, status } = filterDto;
    const Querry = await this.createQueryBuilder('todo');
    await Querry.where('todo.priority = :priority', { priority: priority });
    await Querry.andWhere('todo.status= :status', { status: status });
    const found = await Querry.getMany();
    return found;
  }
  async updateTak(id: number, todoDto: TodoDto): Promise<Todo | null> {
    const todo = await this.findOneOrFail(id);
    if (!todo) {
      throw new NotFoundException('Task Not Found');
    }
    await this.update(id, todoDto);
    return await this.findOne(id);
  }
}
