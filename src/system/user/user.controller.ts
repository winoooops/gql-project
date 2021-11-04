import { Controller, Get, HttpCode, Param, Res } from '@nestjs/common';
import { Response } from 'express'
import { MailService } from '../mail/mail.service';
import { UserService } from './user.service';
import { Types } from 'mongoose'

@Controller('user')
export class UserController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) { }

  @Get('/confirm/:id')
  async confirmEmail(@Param('id') id: string, @Res() res: Response) {
    // 通过id查找数据库并更新确认状态
    console.log(`confirming with id: ` + id)
    const userId = await this.mailService.confirmEmail(id)
    console.log(`用户${userId}正在完成注册...`)
    console.log(new Types.ObjectId(userId))
    await this.userService.update(
      {
        _id: new Types.ObjectId(userId),
        confirmed: true,
      })

    res.send({ status: 200, message: '完成注册' })
  }
}
