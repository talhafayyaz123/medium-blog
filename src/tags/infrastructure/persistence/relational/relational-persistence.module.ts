import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagRepository } from '@src/tags/infrastructure/persistence/tag.repository';

import { TagEntity } from './entities/tag.entity';
import { TagRelationalRepository } from './repositories/tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [
    {
      provide: TagRepository,
      useClass: TagRelationalRepository,
    },
  ],
  exports: [TagRepository],
})
export class RelationalTagPersistenceModule {}
