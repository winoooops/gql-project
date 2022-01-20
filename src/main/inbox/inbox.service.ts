import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateInboxInput } from './dto/create-inbox.input';
import { UpdateInboxInput } from './dto/update-inbox.input';
import { Inbox, InboxDocument } from './entities/inbox.entity';

@Injectable()
export class InboxService {
  constructor(@InjectModel(Inbox.name) private inboxModel: Model<InboxDocument>) { }
  create(createInboxInput: CreateInboxInput) {
    const newInbox = new this.inboxModel(createInboxInput)
    return newInbox.save()
  }

  findAll() {
    return `This action returns all inbox`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inbox`;
  }

  update(id: number, updateInboxInput: UpdateInboxInput) {
    return `This action updates a #${id} inbox`;
  }

  remove(id: number) {
    return `This action removes a #${id} inbox`;
  }
}
