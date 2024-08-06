import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Comment } from '../../comments/domain/comment';

export class Article {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty({
    type: Number,
  })
  author_id: number | string;

  @ApiProperty()
  author: User;

  @ApiProperty()
  comments: Comment[];

  // @custom-inject-point
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
