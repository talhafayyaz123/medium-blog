import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Article } from '../../../../domain/article';
import { ArticleRepository } from '../../article.repository';
import { ArticleMapper } from '../mappers/article.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { ArticleDTOWithTagDomains } from '../../../../articles.types';

@Injectable()
export class ArticleRelationalRepository implements ArticleRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}

  async create(data: ArticleDTOWithTagDomains): Promise<Article> {
    const persistenceModel =
      ArticleMapper.toPersistenceFromDTOWithTagDomains(data);
    const newEntity = await this.articleRepository.save(
      this.articleRepository.create(persistenceModel),
    );

    return ArticleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Article[]> {
    const entities = await this.articleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: {
        author: true,
        tagList: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return entities.map((entity) => ArticleMapper.toDomain(entity));
  }

  async findById(id: Article['id']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findBySlug(slug: Article['slug']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { slug },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async update(id: Article['id'], payload: Partial<Article>): Promise<Article> {
    const entity = await this.articleRepository.findOne({
      where: { id },
      relations: {
        author: true,
        tagList: true,
      },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.articleRepository.save(
      this.articleRepository.create(
        ArticleMapper.toPersistence({
          ...ArticleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    updatedEntity.author = entity.author;

    updatedEntity.tagList = entity.tagList;

    return ArticleMapper.toDomain(updatedEntity);
  }

  async remove(id: Article['id']): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
