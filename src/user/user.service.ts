import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserInput: CreateUserInput): Promise<UserDocument> {
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
