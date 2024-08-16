import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './infrastructure/persistence/article.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Article } from './domain/article';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/domain/comment';
import { TagsService } from '../tags/tags.service';
import { diff } from 'radash';
import { Tag } from '../tags/domain/tag';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly commentsService: CommentsService,
    private readonly tagsService: TagsService,
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

    let tags: NullableType<Tag[]> = [];

    if (createArticleDto.tagList && createArticleDto.tagList.length > 0) {
      tags = await this.tagsService.findByNames(createArticleDto.tagList);

      const newTagNames = diff(
        createArticleDto.tagList,
        tags?.map((tag) => tag.name) || [],
      );

      if (newTagNames.length > 0) {
        const newTags = await this.tagsService.createMany(
          this.tagsService.toCreateTagDtos(newTagNames),
        );

        tags = [...(tags || []), ...newTags];
      }
    }

    const articlePayload = {
      ...clonedPayload,
      tagList: tags,
    };

    const article = await this.articleRepository.create(articlePayload);

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
