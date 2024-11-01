import { ArticleDTOWithTagDomains } from '@src/articles/articles.types';
import { Article } from '@src/articles/domain/article';
import { FavoriteArticle } from '@src/articles/domain/favorite-article';
import { User } from '@src/users/domain/user';
import { UserFollow } from '@src/users/domain/user-follow';
import { DeepPartial } from '@src/utils/types/deep-partial.type';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

export abstract class ArticleAbstractRepository {
  abstract create(data: ArticleDTOWithTagDomains): Promise<Article>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]>;

  abstract findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Article[], number]>;

  abstract findById(id: Article['id']): Promise<NullableType<Article>>;

  abstract findByIdWithRelations(
    id: Article['id'],
  ): Promise<NullableType<Article>>;

  abstract findBySlug(id: Article['slug']): Promise<NullableType<Article>>;

  abstract update(
    entity: Article,
    payload: DeepPartial<
      Omit<
        Article,
        'id' | 'tagList' | 'comments' | 'author' | 'createdAt' | 'updatedAt'
      >
    >,
  ): Promise<Article>;

  abstract findPaginatedWithAuthorIds({
    paginationOptions,
    authorIds,
  }: {
    paginationOptions: IPaginationOptions;
    authorIds: Article['id'][];
  }): Promise<Article[] | []>;

  abstract remove(id: Article['id']): Promise<void>;

  abstract createFavorite(
    data: Omit<FavoriteArticle, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FavoriteArticle>;

  abstract findFavorite(
    followerId: User['id'],
    followingId: Article['id'],
  ): Promise<NullableType<FavoriteArticle>>;

  abstract removeFavorite(id: FavoriteArticle['id']): Promise<void>;

  abstract findFollowedUsers(user: User): Promise<NullableType<UserFollow[]>>;
}
