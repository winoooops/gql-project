import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { jwtConstants } from "./constants";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 默认在 http request里面的Authorization header
      ignoreExpiration: false, // 如果过期返回 401 code
      secretOrKey: jwtConstants.secret, // 密钥
    })
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}