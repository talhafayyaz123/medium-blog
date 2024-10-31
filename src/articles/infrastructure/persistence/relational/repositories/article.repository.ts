import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';

import { ArticleDTOWithTagDomains } from '@src/articles/articles.types';
import { Article } from '@src/articles/domain/article';
import { FavoriteArticle } from '@src/articles/domain/favorite-article';
import { ArticleAbstractRepository } from '@src/articles/infrastructure/persistence/article.abstract.repository';
import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { FollowEntity } from '@src/articles/infrastructure/persistence/relational/entities/follow.entity';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { favoriteArticleFollowMapper } from '@src/articles/infrastructure/persistence/relational/mappers/favorite.article.mapper';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

@Injectable()
export class ArticleRelationalRepository implements ArticleAbstractRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(FollowEntity)
    private readonly articleFavoriteRepository: Repository<FollowEntity>,
  ) {}

  async create(data: ArticleDTOWithTagDomains): Promise<Article> {
    const persistenceModel =
      ArticleMapper.toPersistenceFromDTOWithTagDomains(data);

    const newEntity = await this.articleRepository.save(
      this.articleRepository.create(persistenceModel),
    );

    return ArticleMapper.toDomain(newEntity);
  }

  async find(criteria: FindManyOptions<ArticleEntity>): Promise<Article[]> {
    const entities = await this.articleRepository.find(criteria);
    return entities.map((entity) => ArticleMapper.toDomain(entity));
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

  async findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<[Article[], number]> {
    const [entities, total] = await this.articleRepository.findAndCount({
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

    const data: Article[] = entities.map((entity) =>
      ArticleMapper.toDomain(entity),
    );
    return [data, total];
  }

  async findById(id: Article['id']): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
    });

    return entity ? ArticleMapper.toDomain(entity) : null;
  }

  async findByIdWithRelations(
    id: Article['id'],
  ): Promise<NullableType<Article>> {
    const entity = await this.articleRepository.findOne({
      where: { id },
      relations: {
        author: true,
        tagList: true,
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

  async update(entity: Article, payload: Partial<Article>): Promise<Article> {
    const updatedEntity = await this.articleRepository.save(
      this.articleRepository.create(
        ArticleMapper.toPersistence({
          ...entity,
          ...payload,
        }),
      ),
    );

    return ArticleMapper.toDomain(updatedEntity);
  }

  async remove(id: Article['id']): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async createFavorite(data: FavoriteArticle): Promise<FavoriteArticle> {
    const persistenceModel = favoriteArticleFollowMapper.toPersistence(data);
    const newEntity = await this.articleFavoriteRepository.save(
      this.articleFavoriteRepository.create(persistenceModel),
    );
    return favoriteArticleFollowMapper.toDomain(newEntity);
  }

  async findFavorite(
    followerId: User['id'],
    followingId: Article['id'],
  ): Promise<NullableType<FavoriteArticle>> {
    const entity = await this.articleFavoriteRepository.findOne({
      where: {
        follower: { id: Number(followerId) },
        following: { id: followingId },
      },
      relations: ['follower', 'following'],
    });
    return entity ? favoriteArticleFollowMapper.toDomain(entity) : null;
  }

  async removeFavorite(id: FollowEntity['id']): Promise<void> {
    await this.articleFavoriteRepository.delete(id);
  }
}
