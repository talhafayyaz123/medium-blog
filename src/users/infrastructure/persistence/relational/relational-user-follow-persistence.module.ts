import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowEntity } from '@src/users/infrastructure/persistence/relational/entities/follow.entity';
import { UserFollowupRelationalRepository } from '@src/users/infrastructure/persistence/relational/repositories/user.follow.repository';
import { UserFollowAbstractRepository } from '@src/users/infrastructure/persistence/user.follow.abstract.repository';

import { RelationalUserPersistenceModule } from './relational-persistence.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FollowEntity]),
    RelationalUserPersistenceModule,
  ],
  providers: [
    {
      provide: UserFollowAbstractRepository,
      useClass: UserFollowupRelationalRepository,
    },
  ],
  exports: [UserFollowAbstractRepository],
})
export class RelationalUserFollowPersistenceModule {}
