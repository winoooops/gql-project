import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './entities/project.entity';
import { Task, TaskSchema } from 'src/main/task/entities/task.entity';
import { TaskService } from 'src/main/task/task.service';
import { User, UserSchema } from 'src/system/user/entities/user.entity';
import { UserService } from 'src/system/user/user.service';
import { MailService } from 'src/system/mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [ProjectResolver, ProjectService, TaskService, UserService, MailService],
  exports: [ProjectService],
})
export class ProjectModule { }
