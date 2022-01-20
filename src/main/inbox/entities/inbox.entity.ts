import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
export class Inbox {
  @Field(() => String, { description: '待办项目名称' })
  @Prop()
  name: string;

  @Field(() => String, { description: '是否为高亮任务' })
  @Prop()
  flag: boolean;

  @Field(() => [String], { description: '标签' })
  @Prop()
  tags: string[];

  @Field(() => Date, { description: '开始时间' })
  @Prop()
  startTime: Date;

  @Field(() => Date, { description: '结束时间', nullable: true })
  @Prop()
  endTime?: Date;

  @Field(() => String, { description: '关联任务', nullable: true })
  @Prop()
  taskId?: MongooseSchema.Types.ObjectId;

}

// 构造文档对象, MongooDB增删改返回的文档对象，原型既是Model
export type InboxDocument = Inbox & Document;
// 构造Schama
export const InboxSchema = SchemaFactory.createForClass(Inbox)