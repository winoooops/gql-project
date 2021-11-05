import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, NotFoundException } from "@nestjs/common";
import { SentMessageInfo } from 'nodemailer';
import { v4 } from 'uuid'
import { redis } from "src/redis";
import { UserDocument } from "src/system/user/entities/user.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  async sendEmail(newUser: UserDocument): Promise<SentMessageInfo> {
    // generate uuid
    const id = v4()

    // 在redis上保存uuid
    await redis.set(`confirmEmail: ${id}`, newUser._id, 'ex', 60 * 60 * 15)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        throw new Error(err)
      })

    // 发送邀请邮件
    return this.mailerService.sendMail({
      to: newUser.email,
      from: 'service@wino4999.onexmail.com',
      subject: 'Please Confirm Your Email',
      template: './templates/welcome',
      context: {
        username: newUser.username,
        password: newUser.password,
        link: this.configService.get('BASE_URL') + `/user/confirm/${id}`
      }
    })
  }

  async confirmEmail(id: string): Promise<string> {
    const userId = await redis.get(id)
    // if userId has expired or not exist  
    if (!userId) throw new NotFoundException()

    return userId
  }
}