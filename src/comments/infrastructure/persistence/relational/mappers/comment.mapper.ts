import { Comment } from '@src/comments/domain/comment';
import { CommentEntity } from '@src/comments/infrastructure/persistence/relational/entities/comment.entity';
import { UserMapper } from '@src/users/infrastructure/persistence/relational/mappers/user.mapper';

export class CommentMapper {
  static toDomain(raw: CommentEntity): Comment {
    const domainEntity = new Comment();
    domainEntity.body = raw.body;
    domainEntity.id = raw.id;
    if (raw.author) {
      domainEntity.author = UserMapper.toDomain(raw.author);
    }
    domainEntity.created_at = raw.created_at;
    domainEntity.updated_at = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Comment): CommentEntity {
    const persistenceEntity = new CommentEntity();
    persistenceEntity.body = domainEntity.body;
    if (domainEntity.author_id && typeof domainEntity.author_id === 'number') {
      persistenceEntity.author_id = domainEntity.author_id;
    }
    persistenceEntity.article_id = domainEntity.article_id;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.created_at = domainEntity.created_at;
    persistenceEntity.updated_at = domainEntity.updated_at;

    return persistenceEntity;
  }
}
