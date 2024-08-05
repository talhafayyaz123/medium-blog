import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { RelationalCommentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { ValidatorsModule } from '../validators/validators.module';
import { ArticleEntity } from '../articles/infrastructure/persistence/relational/entities/article.entity';

@Module({
  imports: [
    RelationalCommentPersistenceModule,
    UsersModule,
    ValidatorsModule.forFeature([ArticleEntity]),
  ],
  providers: [CommentsService],
  exports: [CommentsService, RelationalCommentPersistenceModule],
})
export class CommentsModule {}
