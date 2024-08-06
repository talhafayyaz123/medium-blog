import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCommentPathParamDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  id: string;
}
