import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class WebPaginationResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
  totalRecords: number;
  pageNumber: number;
  pageLimit: number;
  to: number;
  from: number;
}

export function WebPaginationResponse<T>(classReference: Type<T>) {
  abstract class WebPagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    totalRecords: number;

    @ApiProperty({
      type: Number,
      example: 1,
    })
    pageNumber: number;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    pageLimit: number;

    @ApiProperty({
      type: Number,
      example: 1,
    })
    from: number;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    to: number;
  }

  Object.defineProperty(WebPagination, 'name', {
    writable: false,
    value: `WebPagination${classReference.name}ResponseDto`,
  });

  return WebPagination;
}
