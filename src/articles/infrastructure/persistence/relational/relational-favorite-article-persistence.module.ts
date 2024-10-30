import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteArticleAbstractRepository } from '@src/articles/infrastructure/persistence/favorite.article.abstract.repository';
import { FollowEntity } from '@src/articles/infrastructure/persistence/relational/entities/follow.entity';
import { FavoriteArticleRelationalRepository } from '@src/articles/infrastructure/persistence/relational/repositories/favorite.article.repository';

import { RelationalArticlePersistenceModule } from './relational-persistence.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FollowEntity]),
    RelationalArticlePersistenceModule,
  ],
  providers: [
    {
      provide: FavoriteArticleAbstractRepository,
      useClass: FavoriteArticleRelationalRepository,
    },
  ],
  exports: [FavoriteArticleAbstractRepository],
})
export class RelationalFavoriteArticlePersistenceModule {}
