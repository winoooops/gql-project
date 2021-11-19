import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field({ description: '用户名' })
  username: string;

  @Field({ description: '密码' })
  password: string;
}