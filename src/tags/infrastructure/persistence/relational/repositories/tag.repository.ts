import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TagEntity } from '../entities/tag.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Tag } from '../../../../domain/tag';
import { TagRepository } from '../../tag.repository';
import { TagMapper } from '../mappers/tag.mapper';

@Injectable()
export class TagRelationalRepository implements TagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createMany(data: Tag[]): Promise<Tag[]> {
    const persistenceModel = data.map((tag) => TagMapper.toPersistence(tag));

    const newEntity = await this.tagRepository.save(
      this.tagRepository.create(persistenceModel),
    );

    return newEntity.map((entity) => TagMapper.toDomain(entity));
  }

  async findAll(): Promise<Tag[]> {
    const entities = await this.tagRepository.find();

    return entities.map((entity) => TagMapper.toDomain(entity));
  }

  async findByNames(names: Tag['name'][]): Promise<NullableType<Tag[]>> {
    const entities = await this.tagRepository.find({
      where: {
        name: In(names),
      },
    });

    return entities.map((entity) => TagMapper.toDomain(entity));
  }
}
