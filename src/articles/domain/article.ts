import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

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

  // @custom-inject-point
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
