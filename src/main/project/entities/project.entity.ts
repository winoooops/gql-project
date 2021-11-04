import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';
import { Task } from 'src/main/task/entities/task.entity';

export enum Status {
  yet = 0,
  onGoing = 1,
  completed = 2,
}

@Schema()
@ObjectType()
export class Project {
  @Field(() => String, { description: '项目id' })
  _id: MongooseSchema.Types.ObjectId;

  @Field({ description: '项目名称' })
  @Prop()
  name: string;

  @Field({ description: '进行状态', nullable: true })
  @Prop()
  status?: Status;

  @Field(() => [String], { description: '项目任务ids', nullable: true })
  @Prop()
  taskIds?: string[];

  @Field(() => [Task], { description: '项目全部任务', nullable: true })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'task' })
  tasks?: Task[];

  @Field(() => [String], { description: '项目参与人', nullable: true })
  @Prop()
  persons?: MongooseSchema.Types.ObjectId[];

  @Field({ description: '项目开始时间', nullable: true })
  @Prop()
  startDate?: string;

  @Field({ description: '项目结束时间', nullable: true })
  @Prop()
  endDate?: string;
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);
