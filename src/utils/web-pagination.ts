import { WebPaginationResponseDto } from './dto/web-pagination-response.dto';
import { IPaginationOptions } from './types/pagination-options';

export const webPagination = <T>(
  data: T[],
  total: number,
  options: IPaginationOptions,
): WebPaginationResponseDto<T> => {
  const from = (options.page - 1) * options.limit + 1;
  const to = Math.min(from + options.limit - 1, total);
  return {
    data,
    hasNextPage: data.length === options.limit,
    totalRecords: total,
    pageNumber: options.page,
    pageLimit: options.limit,
    from,
    to,
  };
};
