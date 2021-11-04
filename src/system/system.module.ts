import { Module } from "@nestjs/common";
import { MailModule } from "./mail/mail.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    MailModule,
    UserModule,
    MailModule
  ],
  providers: []
})
export class SystemModule { }