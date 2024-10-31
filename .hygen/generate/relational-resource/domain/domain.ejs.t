---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
import { ApiProperty } from '@nestjs/swagger';

export class <%= name %> {
  @ApiProperty({
    type: String,
  })
  id: string;

  // @custom-inject-point
  @ApiProperty({
    type: <%= h.getPropertyType(type) %>,
    example: "<%= example %>",
  })
  createdAt: Date;

  @ApiProperty({
    type: <%= h.getPropertyType(type) %>,
    example: "<%= example %>",
  })
  updatedAt: Date;
}
