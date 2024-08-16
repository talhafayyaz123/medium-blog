import { Article } from '@src/articles/domain/article';
import { DeepPartial } from '@src/utils/types/deep-partial.type';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

export abstract class ArticleRepository {
  abstract create(
    data: Omit<
      Article,
      'id' | 'comments' | 'author' | 'created_at' | 'updated_at'
    >,
  ): Promise<Article>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]>;

  abstract findById(id: Article['id']): Promise<NullableType<Article>>;

  abstract findBySlug(id: Article['slug']): Promise<NullableType<Article>>;

  abstract update(
    id: Article['id'],
    payload: DeepPartial<Article>,
  ): Promise<Article | null>;

  abstract remove(id: Article['id']): Promise<void>;
}
