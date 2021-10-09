import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: '用户名' })
  username: string;

  @Field({ description: '邮箱地址' })
  email: string;

  @Field({ description: '用户密码' })
  password: string;

  @Field({ description: '头像', nullable: true })
  avator?: string;
}
