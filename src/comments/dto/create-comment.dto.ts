import { IsString } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';
import { IsForeignKeyExists } from '../../validators/is-foreign-key-exists.validator';
import { ArticleEntity } from '../../articles/infrastructure/persistence/relational/entities/article.entity';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsForeignKeyExists(ArticleEntity, 'id', {
    message: 'Article ID does not exist',
  })
  article_id: string;

  @ApiProperty()
  @IsString()
  body: string;

  // @custom-inject-point

  // Don't forget to use the class-validator decorators in the DTO properties.
}
