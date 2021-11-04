import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'

const saltRounds = 10

export interface UserSettings {
  isDarkMode: boolean;
  textsize: number;
}


@Schema()
@ObjectType()
export class User {
  @Field(() => String, { description: '用户ID' })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String, { description: '用户名' })
  username: string;

  @Prop()
  @Field(() => String, { description: '用户密码' })
  password: string;

  @Prop()
  @Field(() => String, { description: '邮箱地址' })
  email: string;

  @Prop()
  @Field(() => Boolean, { description: '是否邮箱确认', defaultValue: false, })
  confirmed: boolean;

  @Prop()
  @Field(() => String, { description: '头像', nullable: true })
  avatar?: string;

  // @Prop()
  // @Field({ description: '用户设置' })
  // settings: UserSettings
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)



// 加密密码
UserSchema.pre('save', function (this: UserDocument, next: (error?: Error | undefined) => void) {
  if (!this.isModified('password')) return next()
  bcrypt.hash(this.password, saltRounds, (err: Error, hash: string) => {
    if (err) return next(err)
    this.password = hash
    next()
  })
})