import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, In } from 'typeorm';

import { ArticleDTOWithTagDomains } from '@src/articles/articles.types';
import { Article } from '@src/articles/domain/article';
import { FavoriteArticle } from '@src/articles/domain/favorite-article';
import { ArticleAbstractRepository } from '@src/articles/infrastructure/persistence/article.abstract.repository';
import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { FavoriteArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/favorite-article.entity';
import { ArticleMapper } from '@src/articles/infrastructure/persistence/relational/mappers/article.mapper';
import { favoriteArticleFollowMapper } from '@src/articles/infrastructure/persistence/relational/mappers/favorite.article.mapper';
import { User } from '@src/users/domain/user';
import { UserFollow } from '@src/users/domain/user-follow';
import { UserFollowEntity as UserFollowEntity } from '@src/users/infrastructure/persistence/relational/entities/user-follow.entity';
import { UserFollowMapper } from '@src/users/infrastructure/persistence/relational/mappers/user-follow.mapper';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

@Injectable()
export class ArticleRelationalRepository implements ArticleAbstractRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(FavoriteArticleEntity)
    private readonly favoriteArticleRepository: Repository<FavoriteArticleEntity>,
    @InjectRepository(UserFollowEntity)
    private readonly useFollowRepository: Repository<UserFollowEntity>,
  ) {}

  async create(data: ArticleDTOWithTagDomains): Promise<Article> {
    const persistenceModel =
      ArticleMapper.toPersistenceFromDTOWithTagDomains(data);

    const newEntity = await this.articleRepository.save(
      this.articleRepository.create(persistenceModel),
    );

    return ArticleMapper.toDomain(newEntity);
  }

  async findPaginatedWithAuthorIds({
    paginationOptions: { limit, page },
    authorIds,
  }: {
    paginationOptions: IPaginationOptions;
    authorIds: Article['id'][];
  }): Promise<Article[]> {
    const options: FindManyOptions<ArticleEntity> = {
      where: { author_id: In(authorIds) },
      take: limit,
      skip: page,
      order: { created_at: 'DESC' },
      relations: ['author'],
    };

    const entities = await this.articleRepository.find(options);
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
    const newEntity = await this.favoriteArticleRepository.save(
      this.favoriteArticleRepository.create(persistenceModel),
    );
    return favoriteArticleFollowMapper.toDomain(newEntity);
  }

  async findFavorite(
    followerId: User['id'],
    followingId: Article['id'],
  ): Promise<NullableType<FavoriteArticle>> {
    const entity = await this.favoriteArticleRepository.findOne({
      where: {
        user: { id: Number(followerId) },
        article: { id: followingId },
      },
      relations: ['user', 'article'],
    });
    return entity ? favoriteArticleFollowMapper.toDomain(entity) : null;
  }

  async removeFavorite(id: FavoriteArticle['id']): Promise<void> {
    await this.favoriteArticleRepository.delete(id);
  }

  async findFollowedUsers(user: User): Promise<UserFollow[]> {
    const followedUsers = await this.useFollowRepository.find({
      where: { follower: { id: Number(user.id) } },
      relations: ['following'],
      select: ['following'],
    });

    return followedUsers.map((entity) => UserFollowMapper.toDomain(entity));
  }
}
