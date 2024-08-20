import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { CommentsModule } from '../comments/comments.module';
import { TagsModule } from '../tags/tags.module';
import { DatabaseHelperModule } from '../database-helpers/database-helper.module';

@Module({
  imports: [
    RelationalArticlePersistenceModule,
    UsersModule,
    CommentsModule,
    TagsModule,
    DatabaseHelperModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
