import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    UserModule,
    PassportModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule { }
