import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { ListProjectInput } from './dto/list-project.input';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) { }

  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects' })
  findAll(
    @Args('listProjectInput', { nullable: true })
    ListProjectInput?: ListProjectInput,
  ) {
    return this.projectService.findAll(ListProjectInput);
  }

  @Query(() => Project, { name: 'project' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.projectService.findOne(id);
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
}
