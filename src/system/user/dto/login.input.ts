import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class LoginInput {
  @Field({ description: '用户名或邮箱' })
  credential: string;

  @Field({ description: '密码' })
  password: string;
}