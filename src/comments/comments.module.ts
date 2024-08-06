import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { RelationalCommentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [RelationalCommentPersistenceModule, UsersModule],
  providers: [CommentsService],
  exports: [CommentsService, RelationalCommentPersistenceModule],
})
export class CommentsModule {}
