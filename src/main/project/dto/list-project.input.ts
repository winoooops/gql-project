import { Field, InputType } from '@nestjs/graphql';
import { Status } from '../entities/project.entity';
import { Schema as MongooseSchema } from 'mongoose';
@InputType()
export class ListProjectInput {
  @Field(() => String, { description: '项目id', nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field({ description: '项目名称', nullable: true })
  name?: string;

  @Field({ description: '进行状态', nullable: true })
  status?: Status;

  @Field(() => [String], { description: '项目参与人', nullable: true })
  persons?: MongooseSchema.Types.ObjectId[];

  @Field({ description: '项目开始时间', nullable: true })
  startDate?: string;

  @Field({ description: '项目结束时间', nullable: true })
  endDate?: string;
}
