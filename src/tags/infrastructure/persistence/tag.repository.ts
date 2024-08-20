import { NullableType } from '../../../utils/types/nullable.type';
import { Tag } from '../../domain/tag';

export abstract class TagRepository {
  abstract createMany(
    data: Omit<Tag, 'id' | 'created_at' | 'updated_at'>[],
  ): Promise<Tag[]>;

  abstract findAll(): Promise<NullableType<Tag[]>>;

  abstract findByNames(name: Tag['name'][]): Promise<NullableType<Tag[]>>;
}
