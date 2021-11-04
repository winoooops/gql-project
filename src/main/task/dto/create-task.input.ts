import { InputType, Int, Field } from '@nestjs/graphql';
import { Status } from 'src/main/project/entities/project.entity';
import { TaskPriority, TaskType } from '../entities/task.entity';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateTaskInput {
  @Field({ description: '任务名称' })
  name: string;

  @Field({ description: '任务类型' })
  taskType: TaskType;

  @Field({ description: '任务优先级' })
  priority: TaskPriority;

  @Field({ description: '任务状态' })
  status: Status;

  @Field(() => String, { description: '项目id' })
  projectId: MongooseSchema.Types.ObjectId;

  @Field(() => Int, { nullable: true, description: '预估时间' })
  estimatedDay?: number;

  @Field({ nullable: true, description: '描述' })
  desc?: string;

  @Field(() => [String], { nullable: true, description: '任务负责人' })
  persons?: MongooseSchema.Types.ObjectId[];
}
