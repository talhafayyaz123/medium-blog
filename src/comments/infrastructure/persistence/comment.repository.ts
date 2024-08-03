import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Comment } from '../../domain/comment';

export abstract class CommentRepository {
  abstract create(
    data: Omit<Comment, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Comment>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Comment[]>;

  abstract findById(id: Comment['id']): Promise<NullableType<Comment>>;

  abstract update(
    id: Comment['id'],
    payload: DeepPartial<Comment>,
  ): Promise<Comment | null>;

  abstract remove(id: Comment['id']): Promise<void>;
}
