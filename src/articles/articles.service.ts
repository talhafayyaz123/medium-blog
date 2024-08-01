import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './infrastructure/persistence/article.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Article } from './domain/article';
import { JwtPayloadType } from '../auth/strategies/types/jwt-payload.type';

@Injectable()
export class ArticlesService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async create(
    createArticleDto: CreateArticleDto,
    userJwtPayload: JwtPayloadType,
  ) {
    const clonedPayload = {
      ...createArticleDto,
      author_id: userJwtPayload.id,
    };
    return this.articleRepository.create(clonedPayload);
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
