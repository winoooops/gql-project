import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './entities/project.entity';
import { Task, TaskSchema } from 'src/main/task/entities/task.entity';
import { TaskService } from 'src/main/task/task.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  providers: [ProjectResolver, ProjectService, TaskService],
})
export class ProjectModule { }
