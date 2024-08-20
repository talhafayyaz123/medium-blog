import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { CommentEntity } from '@src/comments/infrastructure/persistence/relational/entities/comment.entity';
import { TagEntity } from '@src/tags/infrastructure/persistence/relational/entities/tag.entity';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '@src/utils/relational-entity-helper';
import { NullableType } from '@src/utils/types/nullable.type';

@Entity({
  name: 'article',
})
export class ArticleEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  slug: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty()
  @Column({ type: 'text' })
  body: string;

  @ApiProperty()
  @Column({ type: 'int' })
  author_id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'article_tag',
    joinColumn: {
      name: 'article_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
    },
  })
  tagList?: NullableType<TagEntity[]>;

  // @custom-inject-point
  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
