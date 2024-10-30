//import { UUID } from 'crypto';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';

import { ArticleEntity } from './article.entity';

@Entity({
  name: TABLES.articleFollow,
})
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.following, { eager: true })
  @JoinColumn({ name: 'user_id' })
  follower: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.followers, {
    eager: true,
  })
  @JoinColumn({ name: 'article_id' })
  following: ArticleEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
