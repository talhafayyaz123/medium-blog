import { Tag } from '../../../../../tags/domain/tag';
import { TagEntity } from '../../../../../tags/infrastructure/persistence/relational/entities/tag.entity';
import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
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
      domainEntity.author = UserMapper.toDomain(raw.author);
    }
    if (raw.tagList && raw.tagList.length > 0) {
      domainEntity.tagList = raw.tagList.map((tagEntity: TagEntity) => {
        const tag = new Tag();
        tag.id = tagEntity.id;
        tag.name = tagEntity.name;
        tag.created_at = tagEntity.created_at;
        tag.updated_at = tagEntity.updated_at;
        return tag;
      });
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

    if (domainEntity.tagList && domainEntity.tagList.length > 0) {
      persistenceEntity.tagList = domainEntity.tagList.map((domainEntity) => {
        const tag = new TagEntity();
        tag.id = domainEntity.id;
        tag.name = domainEntity.name;
        tag.created_at = domainEntity.created_at;
        tag.updated_at = domainEntity.updated_at;
        return tag;
      });
    }

    persistenceEntity.created_at = domainEntity.created_at;
    persistenceEntity.updated_at = domainEntity.updated_at;

    return persistenceEntity;
  }
}
