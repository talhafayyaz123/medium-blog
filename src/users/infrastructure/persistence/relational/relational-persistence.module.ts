import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FollowEntity } from '@src/users/infrastructure/persistence/relational/entities/follow.entity';
import { UserAbstractRepository } from '@src/users/infrastructure/persistence/user.abstract.repository';

import { UserEntity } from './entities/user.entity';
import { UsersRelationalRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FollowEntity])],
  providers: [
    {
      provide: UserAbstractRepository,
      useClass: UsersRelationalRepository,
    },
  ],
  exports: [UserAbstractRepository],
})
export class RelationalUserPersistenceModule {}
