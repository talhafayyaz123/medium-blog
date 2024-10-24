import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsModule } from '@src/comments/comments.module';
import { DatabaseHelperModule } from '@src/database-helpers/database-helper.module';
import { TagsModule } from '@src/tags/tags.module';
import { UsersModule } from '@src/users/users.module';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { FollowEntity } from './infrastructure/persistence/relational/entities/follow.entity';
import {UserFollowEntity} from './infrastructure/persistence/relational/entities/userFollow.entity'
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalArticlePersistenceModule,
    UsersModule,
    CommentsModule,
    TagsModule,
    DatabaseHelperModule,
    TypeOrmModule.forFeature([FollowEntity,UserFollowEntity])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
