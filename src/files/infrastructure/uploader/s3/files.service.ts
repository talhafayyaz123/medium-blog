import { Injectable } from '@nestjs/common';

import { ERROR_MESSAGES } from '@src/common/constants';
import { UNPROCESSABLE_ENTITY } from '@src/common/exceptions';
import { FileType } from '@src/files/domain/file';
import { FileRepository } from '@src/files/infrastructure/persistence/file.repository';

@Injectable()
export class FilesS3Service {
  constructor(private readonly fileRepository: FileRepository) {}

  async create(file: Express.MulterS3.File): Promise<{ file: FileType }> {
    if (!file) {
      throw UNPROCESSABLE_ENTITY(ERROR_MESSAGES.NOT_PRESENT('file'), 'file');
    }

    return {
      file: await this.fileRepository.create({
        path: file.key,
      }),
    };
  }
}
