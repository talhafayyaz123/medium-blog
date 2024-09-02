import { Injectable } from '@nestjs/common';

import { QueryBuilder } from '@src/database/utils/query-builder';
import { UserSummary } from '@src/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { ViewsRepository } from '@src/views/infrastructure/persistence/view.repository';

@Injectable()
export class ViewsService {
  constructor(private readonly viewsRepository: ViewsRepository) {}

  getUsersSummaryView(): QueryBuilder<UserSummaryViewEntity> {
    return this.viewsRepository.getUsersSummaryView();
  }

  getUsersSummary(): Promise<UserSummary[]> {
    return this.viewsRepository.getUsersSummary();
  }
}
