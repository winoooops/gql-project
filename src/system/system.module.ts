import { Module } from "@nestjs/common";
import { AuthModule } from "src/system/auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    MailModule,
    AuthModule,
  ],
  providers: []
})
export class SystemModule { }