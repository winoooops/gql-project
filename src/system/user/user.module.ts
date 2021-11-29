import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { MailService } from 'src/system/mail/mail.service';
import { UserController } from './user.controller';
import { ProjectService } from 'src/main/project/project.service';
import { Project, ProjectSchema } from 'src/main/project/entities/project.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  providers: [UserResolver, UserService, MailService, ProjectService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
