import { Article } from '@src/articles/domain/article';
import { FavoriteArticle } from '@src/articles/domain/favorite-article';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class FavoriteArticleAbstractRepository {
  abstract create(
    data: Omit<FavoriteArticle, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FavoriteArticle>;

  abstract find(
    followerId: User['id'],
    followingId: Article['id'],
  ): Promise<NullableType<FavoriteArticle>>;

  abstract remove(id: FavoriteArticle['id']): Promise<void>;
}
