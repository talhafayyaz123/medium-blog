import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@src/users/domain/user';
import { UserFollow } from '@src/users/domain/user-follow';
import { FollowEntity } from '@src/users/infrastructure/persistence/relational/entities/follow.entity';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { UserFollowMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.follow.mapper';
import { UserFollowAbstractRepository } from '@src/users/infrastructure/persistence/user.follow.abstract.repository';
import { NullableType } from '@src/utils/types/nullable.type';

@Injectable()
export class UserFollowupRelationalRepository
  implements UserFollowAbstractRepository
{
  constructor(
    @InjectRepository(FollowEntity)
    private readonly usersFollowRepository: Repository<FollowEntity>,
  ) {}

  async create(data: UserFollow): Promise<UserFollow> {
    const persistenceModel = UserFollowMapper.toPersistence(data);
    const newEntity = await this.usersFollowRepository.save(
      this.usersFollowRepository.create(persistenceModel),
    );
    return UserFollowMapper.toDomain(newEntity);
  }

  async find(
    followerId: User['id'],
    followingId: User['id'],
  ): Promise<NullableType<UserFollow>> {
    const entity = await this.usersFollowRepository.findOne({
      where: {
        follower: { id: Number(followerId) },
        following: { id: Number(followingId) },
      },
      relations: ['follower', 'following'],
    });
    return entity ? UserFollowMapper.toDomain(entity) : null;
  }

  async remove(id: FollowEntity['id']): Promise<void> {
    await this.usersFollowRepository.delete(id);
  }
}
