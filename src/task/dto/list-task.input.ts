import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { TaskPriority, TaskType } from '../entities/task.entity';
import { Status } from 'src/project/entities/project.entity';
@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: '项目名称', nullable: true })
  name?: string;

  @Field({ description: '任务类型', nullable: true })
  taskType?: TaskType;

  @Field({ description: '任务优先级', nullable: true })
  priority?: TaskPriority;

  @Field({ description: '任务状态', nullable: true })
  status?: Status;

  @Field(() => Int, { nullable: true, description: '预估时间' })
  estimatedDay?: number;

  @Field({ description: '描述', nullable: true })
  desc?: string;

  @Field(() => [String], { description: '任务负责人', nullable: true })
  persons?: MongooseSchema.Types.ObjectId[];
}
