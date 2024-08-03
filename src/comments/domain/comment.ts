import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

export class Comment {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  article_id: string;

  @ApiProperty({
    type: Number,
  })
  author_id: number | string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  body: string;

  // @custom-inject-point
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
