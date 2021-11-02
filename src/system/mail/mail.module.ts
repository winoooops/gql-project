import { Module } from "@nestjs/common";
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { MailService } from "./mail.service";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    // nodemailer 发送邮件
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<MailerOptions> => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
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
      inject: [ConfigService],
    })
  ],
  providers: [MailService]
})

export class MailModule { }