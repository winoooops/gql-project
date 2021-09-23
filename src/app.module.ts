import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/db'),
    ProjectModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
