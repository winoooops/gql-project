import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InboxService } from './inbox.service';
import { Inbox } from './entities/inbox.entity';
import { CreateInboxInput } from './dto/create-inbox.input';
import { UpdateInboxInput } from './dto/update-inbox.input';

@Resolver(() => Inbox)
export class InboxResolver {
  constructor(private readonly inboxService: InboxService) {}

  @Mutation(() => Inbox)
  createInbox(@Args('createInboxInput') createInboxInput: CreateInboxInput) {
    return this.inboxService.create(createInboxInput);
  }

  @Query(() => [Inbox], { name: 'inbox' })
  findAll() {
    return this.inboxService.findAll();
  }

  @Query(() => Inbox, { name: 'inbox' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inboxService.findOne(id);
  }

  @Mutation(() => Inbox)
  updateInbox(@Args('updateInboxInput') updateInboxInput: UpdateInboxInput) {
    return this.inboxService.update(updateInboxInput.id, updateInboxInput);
  }

  @Mutation(() => Inbox)
  removeInbox(@Args('id', { type: () => Int }) id: number) {
    return this.inboxService.remove(id);
  }
}
