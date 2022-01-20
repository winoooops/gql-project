import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './main/project/project.module';
import { TaskModule } from './main/task/task.module';
import { SystemModule } from './system/system.module';
import { InboxModule } from './main/inbox/inbox.module';

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
    SystemModule,
    InboxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
