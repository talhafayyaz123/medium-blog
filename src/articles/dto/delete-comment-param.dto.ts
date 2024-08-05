import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsForeignKeyExists } from '../../validators/is-foreign-key-exists.validator';
import { ArticleEntity } from '../infrastructure/persistence/relational/entities/article.entity';
import { CommentEntity } from '../../comments/infrastructure/persistence/relational/entities/comment.entity';

export class DeleteCommentParamDto {
  @ApiProperty()
  @IsString()
  @IsForeignKeyExists(ArticleEntity, 'id', {
    message: 'Article ID does not exist',
  })
  slug: string;

  @ApiProperty()
  @IsString()
  @IsForeignKeyExists(CommentEntity, 'id', {
    message: 'Comment ID does not exist',
  })
  id: string;
}
