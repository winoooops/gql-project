import { Resolver, Query, Mutation, Args, Int, Context, Parent, ResolveField, } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserDocument } from './entities/user.entity';
import { Schema as MongooseSchema } from 'mongoose'
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApolloError } from 'apollo-server-errors';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from '../auth/dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Project } from 'src/main/project/entities/project.entity';
import { ProjectService } from 'src/main/project/project.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) { }

  @Mutation(() => User)
  register(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserDocument | ApolloError> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput) {
    // return this.
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User)
  findOneById(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.userService.findOneById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('credential') credential: string) {
    return this.userService.findOneByCredential(credential)
  }

  @Query(() => [User], { description: '根据项目ID查找参与项目的人员' })
  findUsersByProjectId(@Args('projectId', { type: () => String }) projectId: MongooseSchema.Types.ObjectId) {
    return this.userService.findManyByProject(projectId)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId) {
    return this.userService.remove(id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() parent: User) {
    return this.projectService.findByIds(parent.projectIds)
  }


}
