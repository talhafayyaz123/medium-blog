import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './infrastructure/persistence/comment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Comment } from './domain/comment';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentRepository) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.create(createCommentDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.commentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Comment['id']) {
    return this.commentRepository.findById(id);
  }

  update(id: Comment['id'], updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: Comment['id']) {
    return this.commentRepository.remove(id);
  }
}
