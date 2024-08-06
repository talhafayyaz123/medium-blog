import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Comment } from '../../domain/comment';

export abstract class CommentRepository {
  abstract create(
    data: Omit<
      Comment,
      'id' | 'author' | 'author_id' | 'created_at' | 'updated_at'
    >,
  ): Promise<Comment>;

  abstract findAllWithPagination({
    paginationOptions,
    article_id,
  }: {
    paginationOptions: IPaginationOptions;
    article_id: Comment['article_id'];
  }): Promise<Comment[]>;

  abstract findById(id: Comment['id']): Promise<NullableType<Comment>>;

  abstract remove(id: Comment['id']): Promise<void>;
}
