import { ApiProperty } from '@nestjs/swagger';

export class Article {
  @ApiProperty({
    type: String,
  })
  id: string;

  // @custom-inject-point
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
