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
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Comment[]>;

  abstract remove(id: Comment['id']): Promise<void>;
}
