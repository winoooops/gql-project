import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ListProjectInput } from './dto/list-project.input';
import { Task } from 'src/main/task/entities/task.entity';
import { TaskService } from 'src/main/task/task.service';
import { UserService } from 'src/system/user/user.service';
import { User } from 'src/system/user/entities/user.entity';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) { }

  @Query(() => [Project], { name: 'projects', description: '全部项目' })
  findAll(
    @Args('listProjectInput', { nullable: true })
    listProjectInput?: ListProjectInput,
  ) {
    return this.projectService.findAll(listProjectInput);
  }

  @Query(() => Project, { name: 'project', description: '根据id查找项目' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.create(createProjectInput);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectService.update(updateProjectInput);
  }

  @Mutation(() => Project)
  removeProject(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.projectService.remove(id);
  }

  @ResolveField(() => [Task])
  tasks(@Parent() parent: Project) {
    return this.taskService.findByProjectId(parent._id)
  }

  @ResolveField(() => [User])
  users(@Parent() parent: Project) {
    return this.userService.findManyByProject(parent._id)
  }

}
