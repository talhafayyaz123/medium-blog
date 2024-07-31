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
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

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
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
