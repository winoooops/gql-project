import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ErrorResponse {
  @Field(() => String, { description: '错误信息' })
  message: string;
}