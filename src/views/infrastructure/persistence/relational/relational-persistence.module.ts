import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { ViewsRelationalRepository } from '@src/views/infrastructure/persistence/relational/repositories/view.repository';
import { ViewsRepository } from '@src/views/infrastructure/persistence/view.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSummaryViewEntity])],
  providers: [
    {
      provide: ViewsRepository,
      useClass: ViewsRelationalRepository,
    },
  ],
  exports: [ViewsRepository],
})
export class RelationalviewsPersistenceModule {}
