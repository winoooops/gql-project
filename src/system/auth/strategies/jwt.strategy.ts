import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/system/user/entities/user.entity";
import { UserService } from "src/system/user/user.service";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 默认在 http request里面的Authorization header
      ignoreExpiration: false, // 如果过期返回 401 code
      secretOrKey: jwtConstants.secret, // 密钥
    })
  }

  validate(validationPayload: { email: string, sub: string }): Promise<User> {
    return this.userService.findOneByCredential(validationPayload.email)
  }
}