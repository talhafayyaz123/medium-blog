import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';

import { UserSummary } from '@src/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { UserSummaryViewRepository } from '@src/views/infrastructure/persistence/relational/user-summary-view.repository';

@Injectable()
export class ViewsService {
  constructor(
    private readonly userSummaryRepository: UserSummaryViewRepository,
  ) {}

  getActiveUsersQueryBuilder(): SelectQueryBuilder<UserSummaryViewEntity> {
    return this.userSummaryRepository.getActiveUsersQueryBuilder();
  }

  getActiveUsers(): Promise<UserSummary[]> {
    return this.userSummaryRepository.getActiveUsers();
  }
}
