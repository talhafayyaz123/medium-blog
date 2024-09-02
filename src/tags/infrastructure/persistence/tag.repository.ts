import { Tag } from '@src/tags/domain/tag';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class TagRepository {
  abstract createMany(
    data: Omit<Tag, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<Tag[]>;

  abstract findAll(): Promise<NullableType<Tag[]>>;

  abstract findByNames(name: Tag['name'][]): Promise<NullableType<Tag[]>>;
}
