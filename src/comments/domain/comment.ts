import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({
    type: String,
  })
  id: string;

  // @custom-inject-point
  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
