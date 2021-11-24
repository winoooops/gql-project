import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { InjectModel } from '@nestjs/mongoose';
import { UserInputError, ApolloError } from 'apollo-server-express'
import { Model, Schema as MongooseSchema } from 'mongoose';
import { MailService } from 'src/system/mail/mail.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private mailService: MailService
  ) { }

  @UseGuards(AuthGuard('local'))
  async create(createUserInput: CreateUserInput): Promise<UserDocument | ApolloError> {
    // 判断是否email是否被注册过
    const oldRecord = await this.userModel.findOne({ email: createUserInput.email }).exec()
    if (oldRecord) throw new UserInputError('邮箱已被注册')

    const newUser = new this.userModel(createUserInput)

    // 发送注册邮箱
    await this.mailService.sendEmail(newUser)
      .catch(err => { throw new UserInputError(err) })

    return newUser.save()
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: MongooseSchema.Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findOneByCredential(credential: string): Promise<UserDocument> {
    // 用户名或者邮箱满足条件即可
    return this.userModel.findOne({
      $or: [{ username: credential, }, { email: credential }]
    })
  }

  async findManyByProject(projectId: MongooseSchema.Types.ObjectId): Promise<UserDocument[]> {
    // 找到project包含projectId的用户
    return this.userModel.find({
      projects: { $all: [projectId] }
    })
  }

  async update(updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(
      updateUserInput._id,
      updateUserInput,
      { new: true },
    )
  }

  async remove(id: MongooseSchema.Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }

  // async login(loginInput: LoginInput) {
  //   const user = await this.findOneByCredential(loginInput.credential)
  //   if (!user) throw new UserInputError('该用户不存在,请检查邮箱或用户名.')

  //   const isPassCorrect = bcrypt.compareSync(loginInput.password, user.password)
  //   if (!isPassCorrect) throw new UserInputError('密码错误,请检查密码')

  //   // 用户的信息正确
  //   console.log('登录的用户：')
  //   console.log(user)
  //   return user
  // }
}
