import { Test, TestingModule } from '@nestjs/testing';
import { InboxResolver } from './inbox.resolver';
import { InboxService } from './inbox.service';

describe('InboxResolver', () => {
  let resolver: InboxResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InboxResolver, InboxService],
    }).compile();

    resolver = module.get<InboxResolver>(InboxResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
