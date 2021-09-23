import { CreateProjectInput } from './create-project.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose'
import { Status } from '../entities/project.entity';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field(() => String, { description: '项目id' })
  _id: MongooseSchema.Types.ObjectId;

  @Field({ description: '项目名称', nullable: true })
  name?: string;

  @Field({ description: '进行状态', nullable: true })
  status?: Status;

  @Field({ description: '项目参与人', nullable: true })
  persons?: MongooseSchema.Types.ObjectId[];

  @Field({ description: '项目开始时间', nullable: true })
  startDate?: string;

  @Field({ description: '项目结束时间', nullable: true })
  endDate?: string;
}
