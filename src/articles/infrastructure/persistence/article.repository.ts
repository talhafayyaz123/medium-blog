import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ArticleDTOWithTagDomains } from '../../articles.types';
import { Article } from '../../domain/article';

export abstract class ArticleRepository {
  abstract create(data: ArticleDTOWithTagDomains): Promise<Article>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]>;

  abstract findById(id: Article['id']): Promise<NullableType<Article>>;

  abstract findBySlug(id: Article['slug']): Promise<NullableType<Article>>;

  abstract update(
    id: Article['id'],
    payload: DeepPartial<
      Omit<
        Article,
        'id' | 'tagList' | 'comments' | 'author' | 'created_at' | 'updated_at'
      >
    >,
  ): Promise<Article | null>;

  abstract remove(id: Article['id']): Promise<void>;
}
