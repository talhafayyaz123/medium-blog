import { FavoriteArticle } from '@src/articles/domain/favorite-article';
import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { favoriteEntity } from '@src/articles/infrastructure/persistence/relational/entities/follow.entity';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class favoriteArticleFollowMapper {
  static toDomain(raw: favoriteEntity): FavoriteArticle {
    const domainEntity = new FavoriteArticle();
    domainEntity.id = raw.id;
    if (raw.follower) {
      domainEntity.follower = UserMapper.toDomain(raw.follower);
    }

    if (raw.following) {
      domainEntity.following = ArticleMapper.toDomain(raw.following);
    }

    domainEntity.createdAt = raw.created_at;
    domainEntity.updatedAt = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: FavoriteArticle): favoriteEntity {
    const persistenceEntity = new favoriteEntity();

    persistenceEntity.id = domainEntity.id;

    if (domainEntity.follower) {
      persistenceEntity.follower = new UserEntity();
      persistenceEntity.follower.id = Number(domainEntity.follower.id);
    }

    if (domainEntity.following) {
      persistenceEntity.following = new ArticleEntity();
      persistenceEntity.following.id = domainEntity.following.id;
    }

    persistenceEntity.created_at = domainEntity.createdAt;
    persistenceEntity.updated_at = domainEntity.updatedAt;
    return persistenceEntity;
  }
}
