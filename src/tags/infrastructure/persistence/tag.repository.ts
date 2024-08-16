import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Tag } from '../../domain/tag';

export abstract class TagRepository {
  abstract create(
    data: Omit<Tag, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<Tag>;

  abstract createMany(
    data: Omit<Tag, 'id' | 'created_at' | 'updated_at'>[],
  ): Promise<Tag[]>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Tag[]>;

  abstract findById(id: Tag['id']): Promise<NullableType<Tag>>;

  abstract findByNames(name: Tag['name'][]): Promise<NullableType<Tag[]>>;

  abstract update(
    id: Tag['id'],
    payload: DeepPartial<Tag>,
  ): Promise<Tag | null>;

  abstract remove(id: Tag['id']): Promise<void>;
}
