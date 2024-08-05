import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsForeignKeyExists } from '../../validators/is-foreign-key-exists.validator';
import { ArticleEntity } from '../infrastructure/persistence/relational/entities/article.entity';

export class CreateCommentParamDto {
  @ApiProperty()
  @IsString()
  @IsForeignKeyExists(ArticleEntity, 'id', {
    message: 'Article ID does not exist',
  })
  slug: string;
}
