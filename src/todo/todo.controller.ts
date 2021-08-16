import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FilterDto } from './filter.dto';
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
  @Delete(':id')
  deleteTask(@Param() id: number): Promise<Todo | void> {
    return this.todoService.deleteTask(id);
  }
  @Get(':id')
  getTask(@Param() id: number): Promise<Todo> {
    return this.todoService.getTaskById(id);
  }
  @Patch(':id')
  updateTask(@Param() id: number, @Body() todoDto: TodoDto): Promise<Todo> {
    return this.todoService.updateTask(id, todoDto);
  }
  @Get()
  getAll(@Body() filterDto: FilterDto): Promise<Todo[]> {
    return this.todoService.getAllTasks(filterDto);
  }
}
