import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Article } from './domain/article';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllArticlesDto } from './dto/find-all-articles.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateCommentPathParamDto } from './dto/create-comment-path-param.dto';
import { Comment } from '../comments/domain/comment';
import { FindAllCommentsDto } from './dto/find-all-comments.dto';
import { DeleteCommentPathParamDto } from './dto/delete-comment-path-param.dto';

@ApiTags('Articles')
@Controller({
  path: 'articles',
  version: '1',
})
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiCreatedResponse({
    type: Article,
  })
  async create(@Body() createArticleDto: CreateArticleDto, @Request() request) {
    return await this.articlesService.create(createArticleDto, request.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Article),
  })
  async findAll(
    @Query() query: FindAllArticlesDto,
  ): Promise<InfinityPaginationResponseDto<Article>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.articlesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Article,
  })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post(':slug/comments')
  @ApiParam({
    name: 'slug',
    type: String,
    required: true,
  })
  @ApiCreatedResponse({
    type: Comment,
  })
  async addComment(
    @Param() params: CreateCommentPathParamDto,
    @Body() createCommentDto: CreateCommentDto,
    @Request() request,
  ) {
    const { slug } = params;
    const { body } = createCommentDto;
    return this.articlesService.createComment(slug, body, request.user);
  }

  @Get(':slug/comments')
  @ApiOkResponse({
    type: InfinityPaginationResponse(Comment),
  })
  async findAllComments(
    @Param() params: CreateCommentPathParamDto,
    @Query() query: FindAllCommentsDto,
  ): Promise<InfinityPaginationResponseDto<Comment>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;

    if (limit > 50) {
      limit = 50;
    }

    const { slug } = params;

    return infinityPagination(
      await this.articlesService.findAllCommentsWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        slug,
      }),
      { page, limit },
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':slug/comments/:id')
  removeComment(
    @Param() params: DeleteCommentPathParamDto,
    @Request() request,
  ) {
    const { id, slug } = params;
    return this.articlesService.removeComment(id, slug, request.user);
  }
}
