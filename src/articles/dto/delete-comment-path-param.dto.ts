import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsForeignKeyExists } from '../../validators/is-foreign-key-exists.validator';
import { ArticleEntity } from '../infrastructure/persistence/relational/entities/article.entity';
import { CommentEntity } from '../../comments/infrastructure/persistence/relational/entities/comment.entity';

export class DeleteCommentPathParamDto {
  @ApiProperty()
  @IsString()
  @IsForeignKeyExists(ArticleEntity, 'slug', {
    message: 'Article does not exist',
  })
  slug: string;

  @ApiProperty()
  @IsString()
  @IsForeignKeyExists(CommentEntity, 'id', {
    message: 'Comment does not exist',
  })
  id: string;
}
