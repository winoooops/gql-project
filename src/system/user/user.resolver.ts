import { Resolver, Query, Mutation, Args, Int, Context, } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserDocument } from './entities/user.entity';
import { Types, } from 'mongoose'
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ApolloError } from 'apollo-server-errors';
import { LoginInput } from './dto/login.input';
import { myContext } from 'src/common/type.context';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  register(@Args('createUserInput') createUserInput: CreateUserInput): Promise<UserDocument | ApolloError> {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput): Promise<UserDocument> {
    return this.userService.login(loginInput)
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOneById(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.userService.findOneById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: Types.ObjectId) {
    return this.userService.remove(id);
  }
}
