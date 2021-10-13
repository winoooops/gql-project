import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "src/user/dto/create-user.input";
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendEmail(newUser: CreateUserInput): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: newUser.email,
      from: 'service@wino4999.onexmail.com',
      subject: 'Please Confirm Your Email',
      template: './templates/welcome',
      // html: '<p>email</p>',
      context: {
        username: newUser.username,
        password: newUser.password,
      }
    })
  }
}