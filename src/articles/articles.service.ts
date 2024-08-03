import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './infrastructure/persistence/article.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Article } from './domain/article';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';
import { UsersService } from '../users/users.service';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleRepository,
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
}
