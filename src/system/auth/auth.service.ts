import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { UserDocument } from '../user/entities/user.entity';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    // private readonly jwtService: JwtService,
  ) { }

  async validateUser(loginInput: LoginInput): Promise<UserDocument> {
    const user = await this.userService.findOneByCredential(loginInput.credential)
    if (user && bcrypt.compareSync(loginInput.password, user.password)) {
      return user
    } else {
      return null
    }
  }

  // async login(user: UserDocument): Promise<any> {
  //   const payload = { username: user.username, sub: user._id }
  //   return {
  //     accessToken: this.jwtService.sign(payload)
  //   }
  // }
}
