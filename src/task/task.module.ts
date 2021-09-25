import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { ProjectService } from 'src/project/project.service';
import { Project, ProjectSchema } from 'src/project/entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Project.name, schema: ProjectSchema }
    ]),
  ],
  providers: [TaskResolver, TaskService, ProjectService],
})
export class TaskModule { }
