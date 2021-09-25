import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Schema as MongooseSchema } from 'mongoose';
import { ListProjectInput } from 'src/project/dto/list-project.input';
import { ListTaskInput } from './dto/list-task.input';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/entities/project.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) { }

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll(listTaskInput: ListTaskInput) {
    return this.taskService.findAll(listTaskInput);
  }

  @Query(() => Task, { name: 'task' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation(() => Task)
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
