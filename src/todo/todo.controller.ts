import { Body, Controller, Post } from '@nestjs/common';
import { TodoDto } from './todo.dto';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTask(@Body() todoDto: TodoDto): Promise<Todo> {
    return this.todoService.createTask(todoDto);
  }
}
