import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Project, Status } from 'src/main/project/entities/project.entity';

export enum TaskType {
  Feature = 1,
  Fix = 2,
  Chore = 3,
  Refactor = 4,
  doc = 5,
  test = 6,
}

export enum TaskPriority {
  重要紧急 = 1,
  非重要紧急 = 2,
  重要非紧急 = 3,
  非重要非紧急 = 4,
}

@Schema()
@ObjectType()
export class Task {
  @Field(() => String, { description: '任务id' })
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field({ description: '任务名称' })
  name: string;

  @Prop()
  @Field({ description: '任务类型' })
  taskType: TaskType;

  @Prop()
  @Field(() => String, { description: '项目id' })
  projectId: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field({ description: '任务优先级' })
  priority: TaskPriority;

  @Prop()
  @Field({ description: '任务状态' })
  status: Status;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'project' })
  @Field(() => Project, { description: '项目信息' })
  project?: Project;

  @Prop()
  @Field(() => Int, { nullable: true, description: '预估时间' })
  estimatedDay?: number;

  @Prop()
  @Field({ nullable: true, description: '描述' })
  desc?: string;

  @Prop()
  @Field(() => [String], { nullable: true, description: '任务负责人' })
  persons?: MongooseSchema.Types.ObjectId[];
}

export type TaskDocument = Task & Document;

export const TaskSchema = SchemaFactory.createForClass(Task);
