import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { MailService } from 'src/system/mail/mail.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UserResolver, UserService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }
