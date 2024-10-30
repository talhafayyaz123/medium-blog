import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { TABLES } from '@src/common/constants';

import { UserEntity } from './user.entity';

@Entity({
  name: TABLES.follow,
})
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // The user who is following
  @ManyToOne(() => UserEntity, (user) => user.following)
  @JoinColumn({ name: 'follower_id' })
  follower: UserEntity;

  // The user who is being followed
  @ManyToOne(() => UserEntity, (user) => user.followers)
  @JoinColumn({ name: 'following_id' })
  following: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
