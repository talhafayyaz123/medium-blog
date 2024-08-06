import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentPathParamDto {
  @ApiProperty()
  @IsString()
  slug: string;
}
