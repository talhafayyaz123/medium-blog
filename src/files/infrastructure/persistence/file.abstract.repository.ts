import { FileType } from '@src/files/domain/file';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class FileAbstractRepository {
  abstract create(data: Omit<FileType, 'id'>): Promise<FileType>;

  abstract findById(id: FileType['id']): Promise<NullableType<FileType>>;
}
