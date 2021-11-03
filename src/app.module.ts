import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './system/user/user.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    // 环境变量
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    // graphql 功能
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        settings: {
          'editor.cursorShape': 'block',
          'editor.fontFamily': 'Georgia',
        },
      },
      sortSchema: true,
      debug: false,
    }),
    // mongodb 数据库
    MongooseModule.forRoot('mongodb://localhost:27017/db'),
    ProjectModule,
    TaskModule,
    UserModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
