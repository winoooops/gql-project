import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project, ProjectDocument } from './entities/project.entity';
import { Schema as MongooseSchema } from 'mongoose';
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) { }

  create(createProjectInput: CreateProjectInput): Promise<ProjectDocument> {
    const newProject = new this.projectModel(createProjectInput);
    return newProject.save();
  }

  findAll(): Promise<ProjectDocument[]> {
    return this.projectModel.find().exec();
  }

  findOne(_id: MongooseSchema.Types.ObjectId): Promise<ProjectDocument> {
    return this.projectModel.findById(_id).exec();
  }

  findByIds(ids: MongooseSchema.Types.ObjectId[]) {
    return this.projectModel.find({
      _id: { $in: ids }
    }).exec()
  }


  update(updateProjectInput: UpdateProjectInput): Promise<ProjectDocument> {
    return this.projectModel
      .findByIdAndUpdate(updateProjectInput._id, updateProjectInput, {
        new: true,
      })
      .exec();
  }

  remove(id: MongooseSchema.Types.ObjectId): Promise<ProjectDocument> {
    return this.projectModel.findByIdAndDelete(id).exec();
  }
}
