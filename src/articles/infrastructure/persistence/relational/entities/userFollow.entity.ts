import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

import { TABLES } from '@src/common/constants';


@Entity({
  name: TABLES.userFollow,
})
@Unique(['follower_id', 'following_id'])
export class UserFollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  follower_id: number;

  @Column({ type: 'int', nullable: false })
  following_id: number;


  @CreateDateColumn({ name: 'created_at' }) 
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}