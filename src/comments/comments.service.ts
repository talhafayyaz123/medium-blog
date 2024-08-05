import { Injectable } from '@nestjs/common';
import { CommentRepository } from './infrastructure/persistence/comment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Comment } from './domain/comment';
import { UsersService } from '../users/users.service';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private userService: UsersService,
  ) {}

  async create(
    article_id: Comment['article_id'],
    body: Comment['body'],
    userJwtPayload: JwtPayloadType,
  ) {
    const clonedPayload = {
      article_id,
      body,
      author_id: userJwtPayload.id,
    };

    const comment = await this.commentRepository.create(clonedPayload);

    const user = await this.userService.findById(userJwtPayload.id);

    if (user) {
      comment.author = user;
    }

    return comment;
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

  remove(id: Comment['id']) {
    return this.commentRepository.remove(id);
  }
}
