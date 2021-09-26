import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Schema as MongooseSchema } from 'mongoose';
import { ListTaskInput } from './dto/list-task.input';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) { }

  @Query(() => [Task], { name: 'tasks', description: '条件查询任务' })
  findAll(listTaskInput: ListTaskInput) {
    return this.taskService.findAll(listTaskInput);
  }

  @Query(() => Task, { name: 'task', description: '根据id查找任务' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.taskService.findOne(id);
  }

  @Query(() => [Task], { description: '根据项目id查找任务' })
  findByProjectId(@Args('projectId', { type: () => String }) projectId: MongooseSchema.Types.ObjectId) {
    return this.taskService.findByProjectId(projectId)
  }

  @Mutation(() => Task, { description: '创建任务' })
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
    const newTask = this.taskService.create(createTaskInput)
    return newTask;
  }

  @Mutation(() => Task, { description: '编辑任务' })
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation(() => Task, { description: '根据id删除任务' })
  removeTask(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.taskService.remove(id);
  }

  @ResolveField(() => Project)
  project(@Parent() parent: Task) {
    return this.projectService.findOne(parent.projectId);
  }
}
