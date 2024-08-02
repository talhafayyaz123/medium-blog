import { Article } from '../../../../domain/article';
import { ArticleEntity } from '../entities/article.entity';

export class ArticleMapper {
  static toDomain(raw: ArticleEntity): Article {
    const domainEntity = new Article();
    domainEntity.body = raw.body;
    domainEntity.description = raw.description;
    domainEntity.title = raw.title;
    domainEntity.slug = raw.slug;
    domainEntity.id = raw.id;
    if (raw.author) {
      domainEntity.author = raw.author;
    }
    domainEntity.created_at = raw.created_at;
    domainEntity.updated_at = raw.updated_at;

    return domainEntity;
  }

  static toPersistence(domainEntity: Article): ArticleEntity {
    const persistenceEntity = new ArticleEntity();
    persistenceEntity.body = domainEntity.body;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.title = domainEntity.title;
    persistenceEntity.slug = domainEntity.slug;
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.author_id && typeof domainEntity.author_id === 'number') {
      persistenceEntity.author_id = domainEntity.author_id;
    }
    persistenceEntity.created_at = domainEntity.created_at;
    persistenceEntity.updated_at = domainEntity.updated_at;

    return persistenceEntity;
  }
}
