import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from '@src/comments/domain/comment';
import { CommentRepository } from '@src/comments/infrastructure/persistence/comment.repository';
import { CommentEntity } from '@src/comments/infrastructure/persistence/relational/entities/comment.entity';
import { CommentMapper } from '@src/comments/infrastructure/persistence/relational/mappers/comment.mapper';
import { NullableType } from '@src/utils/types/nullable.type';
import { IPaginationOptions } from '@src/utils/types/pagination-options';

@Injectable()
export class CommentRelationalRepository implements CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(data: Comment): Promise<Comment> {
    const persistenceModel = CommentMapper.toPersistence(data);
    const newEntity = await this.commentRepository.save(
      this.commentRepository.create(persistenceModel),
    );
    return CommentMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    article_id,
  }: {
    paginationOptions: IPaginationOptions;
    article_id: Comment['article_id'];
  }): Promise<Comment[]> {
    const entities = await this.commentRepository.find({
      where: { article_id },
      relations: {
        author: true,
      },
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => CommentMapper.toDomain(entity));
  }

  async remove(id: Comment['id']): Promise<void> {
    await this.commentRepository.delete(id);
  }

  async findById(id: Comment['id']): Promise<NullableType<Comment>> {
    const entity = await this.commentRepository.findOne({
      where: { id },
      relations: {
        author: true,
      },
    });

    return entity ? CommentMapper.toDomain(entity) : null;
  }
}
