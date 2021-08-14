import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './ormconfig.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, TodoModule, TypeOrmModule.forRoot(OrmConfig)],
})
export class AppModule {}
