import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { UserSummaryViewRelationalRepository } from '@src/views/infrastructure/persistence/relational/repositories/user-summary-view.repository';
import { UserSummaryViewRepository } from '@src/views/infrastructure/persistence/relational/user-summary-view.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSummaryViewEntity])],
  providers: [
    {
      provide: UserSummaryViewRepository,
      useClass: UserSummaryViewRelationalRepository,
    },
  ],
  exports: [UserSummaryViewRepository],
})
export class RelationalviewsPersistenceModule {}
