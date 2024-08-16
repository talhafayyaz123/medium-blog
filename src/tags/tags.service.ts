import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './infrastructure/persistence/tag.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Tag } from './domain/tag';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  create(createTagDto: CreateTagDto) {
    return this.tagRepository.create(createTagDto);
  }

  createMany(createTagDto: CreateTagDto[]) {
    return this.tagRepository.createMany(createTagDto);
  }

  toCreateTagDtos(tagNames: string[]): CreateTagDto[] {
    return tagNames.map((tagName) => ({ name: tagName }) as CreateTagDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.tagRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Tag['id']) {
    return this.tagRepository.findById(id);
  }

  async findByNames(names: Tag['name'][]): Promise<NullableType<Tag[]>> {
    return await this.tagRepository.findByNames(names);
  }

  update(id: Tag['id'], updateTagDto: UpdateTagDto) {
    return this.tagRepository.update(id, updateTagDto);
  }

  remove(id: Tag['id']) {
    return this.tagRepository.remove(id);
  }
}
