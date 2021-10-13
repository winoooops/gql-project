import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { SystemModule } from './system/system.module';

console.log(process.cwd() + '/src/system/mail/templates')
@Module({
  imports: [
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
    // nodemailer 发送邮件
    MailerModule.forRoot({
      // transporter 配置
      transport: {
        host: 'smtp.exmail.qq.com',
        port: 465,
        // ignoreTLS: true,
        secure: true,
        auth: {
          user: 'service@wino4999.onexmail.com',
          pass: 'BR6dL8TkFFju5AUx'
        },
      },
      // 邮件默认属性
      defaults: {
        from: '"No Reply" <service@wino4999.onexmail.com>',
      },
      preview: true,
      template: {
        dir: process.cwd() + '/src/system/mail/templates',
        // 允许handlerbars使用行内样式
        adapter: new HandlebarsAdapter(/* helpers */ undefined, {
          inlineCssEnabled: true,
          /** See https://www.npmjs.com/package/inline-css#api */
          inlineCssOptions: {
            url: ' ',
            preserveMediaQueries: true,
          },
        }), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ProjectModule,
    TaskModule,
    UserModule,
    SystemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
