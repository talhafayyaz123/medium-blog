import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RelationalFavoriteArticlePersistenceModule } from '@src/articles/infrastructure/persistence/relational/relational-favorite-article-persistence.module';
import { CommentsModule } from '@src/comments/comments.module';
import { DatabaseHelperModule } from '@src/database-helpers/database-helper.module';
import { GenAiModule } from '@src/gen-ai/gen-ai.module';
import { TagsModule } from '@src/tags/tags.module';
import { UsersModule } from '@src/users/users.module';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { FollowEntity } from './infrastructure/persistence/relational/entities/follow.entity';
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FollowEntity as UserFollowEntity } from '@src/users/infrastructure/persistence/relational/entities/follow.entity';

@Module({
  imports: [
    RelationalArticlePersistenceModule,
    RelationalFavoriteArticlePersistenceModule,
    UsersModule,
    CommentsModule,
    TagsModule,
    DatabaseHelperModule,
    TypeOrmModule.forFeature([FollowEntity, UserFollowEntity]),
    GenAiModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
