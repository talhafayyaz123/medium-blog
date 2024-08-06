import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class Comment {
  @ApiProperty({
    type: String,
  })
  id: string;

  article_id: string;

  author_id: number | string;

  @ApiProperty()
  body: string;

  // @custom-inject-point
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  author: User;
}
