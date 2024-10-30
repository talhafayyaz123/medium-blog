import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { diff, unique } from 'radash';
import slugify from 'slugify';
import { Repository, In, FindManyOptions } from 'typeorm';

import { ArticleEntity } from '@src/articles/infrastructure/persistence/relational/entities/article.entity';
import { JwtPayloadType } from '@src/auth/strategies/types/jwt-payload.type';
import { CommentsService } from '@src/comments/comments.service';
import { Comment } from '@src/comments/domain/comment';
import {
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
  BAD_REQUEST,
} from '@src/common/exceptions';
import { DatabaseHelperRepository } from '@src/database-helpers/database-helper';
import { Tag } from '@src/tags/domain/tag';
import { TagsService } from '@src/tags/tags.service';
import { User } from '@src/users/domain/user';
import { UserEntity } from '@src/users/infrastructure/persistence/relational/entities/user.entity';
import { UsersService } from '@src/users/users.service';
import { pagination } from '@src/utils/pagination';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

import { Article } from './domain/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleAbstractRepository } from './infrastructure/persistence/article.abstract.repository';
import { FavoriteArticleAbstractRepository } from './infrastructure/persistence/favorite.article.abstract.repository';
import { FollowEntity } from './infrastructure/persistence/relational/entities/follow.entity';
import { UserFollowEntity } from './infrastructure/persistence/relational/entities/userFollow.entity';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly articleRepository: ArticleAbstractRepository,
    private readonly commentsService: CommentsService,
    private readonly tagsService: TagsService,
    private readonly dbHelperRepository: DatabaseHelperRepository,
    private userService: UsersService,
    private readonly favoriteArticleRepository: FavoriteArticleAbstractRepository,
    @InjectRepository(FollowEntity)
    private readonly followRepository: Repository<FollowEntity>,
    @InjectRepository(UserFollowEntity)
    private readonly useFollowRepository: Repository<UserFollowEntity>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    userJwtPayload: JwtPayloadType,
  ): Promise<Article> {
    return this.dbHelperRepository.transactionManager.runInTransaction(
      async () =>
        this.createArticleWithTransaction(createArticleDto, userJwtPayload),
    );
  }

  private async createArticleWithTransaction(
    createArticleDto: CreateArticleDto,
    userJwtPayload: JwtPayloadType,
  ): Promise<Article> {
    const clonedPayload = {
      ...createArticleDto,
      authorId: userJwtPayload.id,
    };

    let tags: NullableType<Tag[]> = [];

    if (createArticleDto.tagList && createArticleDto.tagList.length > 0) {
      const uniqueTagList = unique(createArticleDto.tagList);

      tags = await this.tagsService.findByNames(uniqueTagList);

      const newTagNames = diff(
        uniqueTagList,
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
      slug: this.slugify(createArticleDto.title),
    };

    const article = await this.articleRepository.create(articlePayload);
    return await this.findAndValidate('id', article?.id, true);
  }

  slugify(title: string): string {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    });

    const uniqueSuffix = this.generateUniqueSuffix();

    return `${baseSlug}-${uniqueSuffix}`;
  }

  generateUniqueSuffix(length: number = 11): string {
    const charset =
      'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
    let id = '';
    const randomValues = crypto.getRandomValues(new Uint8Array(length));

    for (let i = 0; i < length; i++) {
      id += charset[randomValues[i] & 63]; // Ensure the index is twithin the range 0-63
    }

    return id;
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

  async findAllWithPaginationStandard({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    const [data, total]: [Article[], number] =
      await this.articleRepository.findAllWithPaginationStandard({
        paginationOptions: {
          page: paginationOptions.page,
          limit: paginationOptions.limit,
        },
      });
    return pagination(data, total, paginationOptions);
  }

  findOne(id: Article['id']) {
    return this.findAndValidate('id', id, true);
  }

  async update(id: Article['id'], updateArticleDto: UpdateArticleDto) {
    const article = await this.findAndValidate('id', id);

    const { title, ...rest } = updateArticleDto;

    const payload = {
      ...rest,
      title,
      ...(title && title !== article.title && { slug: this.slugify(title) }),
    };

    const updatedArticle = await this.articleRepository.update(
      article,
      payload,
    );

    return await this.findAndValidate('id', updatedArticle.id, true);
  }

  remove(id: Article['id']) {
    return this.articleRepository.remove(id);
  }

  async createComment(
    slug: Article['slug'],
    body: Comment['body'],
    userJwtPayload: JwtPayloadType,
  ) {
    const article = await this.findAndValidate('slug', slug);

    return await this.commentsService.create(article.id, body, userJwtPayload);
  }

  async findAllCommentsWithPagination({
    paginationOptions,
    slug,
  }: {
    paginationOptions: IPaginationOptions;
    slug: Article['slug'];
  }) {
    const article = await this.findAndValidate('slug', slug);

    return this.commentsService.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      articleId: article.id,
    });
  }

  async removeComment(
    id: Comment['id'],
    slug: Article['slug'],
    userJwtPayload: JwtPayloadType,
  ) {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw NOT_FOUND('Article', { slug });
    }

    return await this.commentsService.remove(id, userJwtPayload);
  }

  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // captilize first letter of the field name
    if (typeof this.articleRepository[repoFunction] !== 'function') {
      throw UNPROCESSABLE_ENTITY(
        `Method ${repoFunction} not found on article repository.`,
        field,
      );
    }

    const article = await this.articleRepository[repoFunction](value);
    if (!article) {
      throw NOT_FOUND('Article', { [field]: value });
    }
    return article;
  }

  async favoriteArticle(slug: string, user: UserEntity): Promise<Article> {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw NOT_FOUND('Article', { slug });
    }

    /*   const existingFollow = await this.followRepository.findOne({
      where: {
        follower: { id: Number(user.id) },
        following: { id: article.id },
      },
    }); */

    const existingFollow = await this.favoriteArticleRepository.find(
      user.id,
      article.id,
    );

    if (existingFollow) throw BAD_REQUEST(`${slug}, Already favorited.`);

    const clonedPayload = {
      follower: {
        id: user.id,
      } as User,
      following: {
        id: article.id,
      } as Article,
    };

    await this.favoriteArticleRepository.create(clonedPayload);
    /*   const follow = this.followRepository.create({
      follower: { id: Number(user.id) },
      following: { id: article.id },
    });
    await this.followRepository.save(follow); */

    const responseArticle = {
      ...article,
      favorited: true,
    };

    return responseArticle;
  }

  async unfavoriteArticle(slug: string, user: UserEntity): Promise<Article> {
    const article = await this.articleRepository.findBySlug(slug);
    if (!article) {
      throw NOT_FOUND('Article', { slug });
    }

    if (!article.id) {
      console.error('Article ID is null or undefined:', article);
    }

    if (!user.id) {
      console.error('User ID is null or undefined:', user);
    }

    const existingFollow = await this.favoriteArticleRepository.find(
      user.id,
      article.id,
    );

    if (!existingFollow) throw BAD_REQUEST(`${slug}, article not favorited.`);

    await this.favoriteArticleRepository.remove(existingFollow.id);

    const responseArticle = {
      ...article,
      favorited: false,
    };

    return responseArticle;
  }

  async getFeedArticles(
    user: UserEntity,
    limit: string,
    offset: string,
  ): Promise<Article[]> {
    const followedUsers: UserFollowEntity[] =
      await this.useFollowRepository.find({
        where: { follower_id: user.id },
        select: ['following_id'],
      });

    const followingIds = followedUsers.map((follow) => follow.following_id);

    if (followingIds.length > 0) {
      const numericLimit = Number(limit);
      const numericOffset = Number(offset);

      const options: FindManyOptions<ArticleEntity> = {
        where: { author_id: In(followingIds) },
        take: numericLimit,
        skip: numericOffset,
        order: { created_at: 'DESC' },
        relations: ['author'],
      };

      const articles = await this.articleRepository.find(options);
      return articles;
    }

    return [];
  }
}
