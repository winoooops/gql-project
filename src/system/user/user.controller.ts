import { Controller, Get, Param } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Controller('user')
export class UserController {
  constructor(private readonly mailService: MailService) { }


  @Get('/confirm/:id')
  async confirmEmail(@Param('id') id: string) {
    return this.mailService.confirmEmail(id)
  }
}
