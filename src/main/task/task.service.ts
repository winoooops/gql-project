import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task, TaskDocument } from './entities/task.entity';
import { Schema as MongooseSchema } from 'mongoose';
import { ListTaskInput } from './dto/list-task.input';
@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }
  create(createTaskInput: CreateTaskInput): Promise<TaskDocument> {
    const newTask = new this.taskModel(createTaskInput);
    return newTask.save();
  }

  findAll(listTaskInput: ListTaskInput): Promise<TaskDocument[]> {
    return this.taskModel.find(listTaskInput).exec();
  }

  findOne(id: MongooseSchema.Types.ObjectId): Promise<TaskDocument> {
    return this.taskModel.findById(id).exec();
  }

  findByProjectId(projectId: MongooseSchema.Types.ObjectId): Promise<TaskDocument[]> {
    return this.taskModel.find({ projectId: projectId }).exec()
  }

  update(updateTaskInput: UpdateTaskInput) {
    return this.taskModel.findByIdAndUpdate(
      updateTaskInput._id,
      updateTaskInput,
      { new: true },
    );
  }

  remove(id: MongooseSchema.Types.ObjectId): Promise<TaskDocument> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
