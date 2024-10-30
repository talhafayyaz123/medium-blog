import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesModule } from '@src/files/files.module';
import { ViewsModule } from '@src/views/views.module';

import { FollowEntity } from './infrastructure/persistence/relational/entities/follow.entity';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { RelationalUserFollowPersistenceModule } from '@src/users/infrastructure/persistence/relational/relational-user-follow-persistence.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [
    infrastructurePersistenceModule,
    RelationalUserFollowPersistenceModule,
    FilesModule,
    ViewsModule,
    TypeOrmModule.forFeature([FollowEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
