import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/entities/user.entity';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt'
import { jwtConstants } from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findOneByCredential(username)
    console.log(user)
    if (user && bcrypt.compareSync(password, user.password)) {
      return user
    } else {
      return null
    }
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async verifyToken(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret })

    const user = this.userService.findOneByCredential(decoded.email)

    return user
  }
}
