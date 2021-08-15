import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterDto } from './filter.dto';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoRepository } from './todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  async createTask(todoDto: TodoDto): Promise<Todo> {
    return this.todoRepository.createTask(todoDto);
  }
  async deleteTask(id: number): Promise<void> {
    return this.todoRepository.deleteTask(id);
  }
  async getTaskById(id: number): Promise<Todo> {
    return this.todoRepository.getTask(id);
  }
  async getAllTasks(filterDto: FilterDto): Promise<Todo[]> {
    return this.todoRepository.getAll(filterDto);
  }
  async updateTask(id: number, todoDto: TodoDto): Promise<Todo> {
    return this.todoRepository.updateTak(id, todoDto);
  }
}
