import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique,ManyToOne ,JoinColumn} from 'typeorm';

import { TABLES } from '@src/common/constants';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity'; 
import { ArticleEntity } from './article.entity';
import { UUID } from 'crypto';


@Entity({
  name: TABLES.articleFollow,
})
//@Unique(['follower_id', 'following_id'])
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false }) 
  user_id: number;

  @Column({ type: 'uuid', nullable: false }) 
  article_id: string;
 
  /*  @ManyToOne(() => UserEntity, user => user.following, { eager: true })
  @JoinColumn({ name: 'follower_id' }) 
  follower: UserEntity;

  @ManyToOne(() => ArticleEntity, article => article.followers, { eager: true })
  @JoinColumn({ name: 'following_id' }) 
  following: ArticleEntity;  */
 

  @CreateDateColumn({ name: 'created_at' }) 
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}