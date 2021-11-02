import { Inject, Injectable } from '@nestjs/common';
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

  async create(createUserInput: CreateUserInput): Promise<UserDocument | ApolloError> {
    // 判断是否email是否被注册过
    const oldRecord = await this.userModel.findOne({ email: createUserInput.email }).exec()
    if (oldRecord) throw new UserInputError('邮箱已被注册')

    // 发送注册邮箱
    await this.mailService.sendEmail(createUserInput)
      .catch(err => { throw new UserInputError(err) })

    const newUser = new this.userModel(createUserInput)
    return newUser.save()
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  findOneById(id: MongooseSchema.Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  update(updateUserInput: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(
      updateUserInput.id,
      updateUserInput,
      { new: true },
    )
  }

  remove(id: MongooseSchema.Types.ObjectId): Promise<UserDocument> {
    return this.userModel.findOneAndDelete({ _id: id }).exec();
  }
}
