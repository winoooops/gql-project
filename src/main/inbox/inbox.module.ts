import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxResolver } from './inbox.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Inbox, InboxSchema } from './entities/inbox.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Inbox.name, schema: InboxSchema }
    ])
  ],
  providers: [InboxResolver, InboxService]
})
export class InboxModule { }
