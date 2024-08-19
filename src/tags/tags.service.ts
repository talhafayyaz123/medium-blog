import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagRepository } from './infrastructure/persistence/tag.repository';
import { Tag } from './domain/tag';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}

  createMany(createTagDto: CreateTagDto[]) {
    return this.tagRepository.createMany(createTagDto);
  }

  toCreateTagDtos(tagNames: string[]): CreateTagDto[] {
    return tagNames.map((tagName) => ({ name: tagName }) as CreateTagDto);
  }

  async findAll() {
    const tags = await this.tagRepository.findAll();

    return tags?.map((tag) => tag.name) || [];
  }

  async findByNames(names: Tag['name'][]): Promise<NullableType<Tag[]>> {
    return await this.tagRepository.findByNames(names);
  }
}
