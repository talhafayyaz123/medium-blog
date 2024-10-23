import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique,ManyToOne } from 'typeorm';

import { TABLES } from '@src/common/constants';

import { UserEntity } from './user.entity';

@Entity({
  name: TABLES.follow,
})
@Unique(['follower_id', 'following_id'])
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  follower_id: number;

  @Column({ type: 'int', nullable: false })
  following_id: number;


  @ManyToOne(() => UserEntity, (user) => user.followers)
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.following)
  following: UserEntity;

  @CreateDateColumn({ name: 'created_at' }) 
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
