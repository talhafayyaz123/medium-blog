import { User } from '@src/users/domain/user';
import { UserFollow } from '@src/users/domain/user-follow';
import { NullableType } from '@src/utils/types/nullable.type';

export abstract class UserFollowAbstractRepository {
  abstract create(
    data: Omit<UserFollow, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserFollow>;

  abstract find(
    followerId: User['id'],
    followingId: User['id'],
  ): Promise<NullableType<UserFollow>>;

  abstract remove(id: User['id']): Promise<void>;
}
