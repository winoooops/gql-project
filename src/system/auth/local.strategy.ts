import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login.input";
import { UserDocument } from "../user/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }

  async validate(loginInput: LoginInput): Promise<UserDocument> {
    const user = this.authService.validateUser(loginInput)
    if (!user) throw new UnauthorizedException()

    return user
  }
}