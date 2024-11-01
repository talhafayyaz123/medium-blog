import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleAbstractRepository } from '@src/articles/infrastructure/persistence/article.abstract.repository';
import { favoriteEntity as ArticleFavoriteEntity } from '@src/articles/infrastructure/persistence/relational/entities/follow.entity';
import { FollowEntity as UserFollowEntity } from '@src/users/infrastructure/persistence/relational/entities/follow.entity';

import { ArticleEntity } from './entities/article.entity';
import { ArticleRelationalRepository } from './repositories/article.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleEntity,
      ArticleFavoriteEntity,
      UserFollowEntity,
    ]),
  ],
  providers: [
    {
      provide: ArticleAbstractRepository,
      useClass: ArticleRelationalRepository,
    },
  ],
  exports: [ArticleAbstractRepository],
})
export class RelationalArticlePersistenceModule {}
