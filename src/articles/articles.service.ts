import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';
import { CommentsService } from '@src/comments/comments.service';
import { Comment } from '@src/comments/domain/comment';
import { UsersService } from '@src/users/users.service';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './infrastructure/persistence/article.repository';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly commentsService: CommentsService,
    private userService: UsersService,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userJwtPayload: JwtPayloadType,
  ) {
    const clonedPayload = {
      ...createArticleDto,
      author_id: userJwtPayload.id,
    };

    const article = await this.articleRepository.create(clonedPayload);

    const user = await this.userService.findById(userJwtPayload.id);

    if (user) {
      article.author = user;
    }

    return article;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.articleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Article['id']) {
    return this.articleRepository.findById(id);
  }

  update(id: Article['id'], updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.update(id, updateArticleDto);
  }

  remove(id: Article['id']) {
    return this.articleRepository.remove(id);
  }

  async createComment(
    slug: Article['slug'],
    body: Comment['body'],
    userJwtPayload: JwtPayloadType,
  ) {
    const article = await this.validateAndFetchArticle(slug);

    return await this.commentsService.create(article.id, body, userJwtPayload);
  }

  async findAllCommentsWithPagination({
    paginationOptions,
    slug,
  }: {
    paginationOptions: IPaginationOptions;
    slug: Article['slug'];
  }) {
    const article = await this.validateAndFetchArticle(slug);

    return this.commentsService.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      article_id: article.id,
    });
  }

  async validateAndFetchArticle(slug: Article['slug']): Promise<Article> {
    const article = await this.articleRepository.findBySlug(slug);

    if (!article) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          slug: 'Artilce not found',
        },
      });
    }

    return article;
  }

  async validateArticle(slug: Article['slug']): Promise<void> {
    const article = await this.articleRepository.findBySlug(slug);

    if (!article) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          slug: 'Artilce not found',
        },
      });
    }
  }

  async removeComment(
    id: Comment['id'],
    slug: Article['slug'],
    userJwtPayload: JwtPayloadType,
  ) {
    await this.validateArticle(slug);

    return await this.commentsService.remove(id, userJwtPayload);
  }
}
