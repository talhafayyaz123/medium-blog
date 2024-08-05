import { IsString } from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  body: string;

  // @custom-inject-point

  // Don't forget to use the class-validator decorators in the DTO properties.
}
