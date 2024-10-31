import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Article } from '@src/articles/domain/article';
import { FavoriteArticle } from '@src/articles/domain/favorite-article';
import { FavoriteArticleAbstractRepository } from '@src/articles/infrastructure/persistence/favorite.article.abstract.repository';
import { FollowEntity } from '@src/articles/infrastructure/persistence/relational/entities/follow.entity';
import { favoriteArticleFollowMapper } from '@src/articles/infrastructure/persistence/relational/mappers/favorite.article.mapper';
import { User } from '@src/users/domain/user';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class FavoriteArticleRelationalRepository
  implements FavoriteArticleAbstractRepository
{
  constructor(
    @InjectRepository(FollowEntity)
    private readonly usersFollowRepository: Repository<FollowEntity>,
  ) {}

  async create(data: FavoriteArticle): Promise<FavoriteArticle> {
    const persistenceModel = favoriteArticleFollowMapper.toPersistence(data);
    const newEntity = await this.usersFollowRepository.save(
      this.usersFollowRepository.create(persistenceModel),
    );
    return favoriteArticleFollowMapper.toDomain(newEntity);
  }

  async find(
    followerId: User['id'],
    followingId: Article['id'],
  ): Promise<NullableType<FavoriteArticle>> {
    const entity = await this.usersFollowRepository.findOne({
      where: {
        follower: { id: Number(followerId) },
        following: { id: followingId },
      },
      relations: ['follower', 'following'],
    });
    return entity ? favoriteArticleFollowMapper.toDomain(entity) : null;
  }

  async remove(id: FollowEntity['id']): Promise<void> {
    await this.usersFollowRepository.delete(id);
  }
}
