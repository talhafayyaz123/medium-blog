import { SelectQueryBuilder } from 'typeorm';

import { UserSummary } from '@src/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';

export abstract class UserSummaryViewRepository {
  abstract getActiveUsersQueryBuilder(): SelectQueryBuilder<UserSummaryViewEntity>;
  abstract getActiveUsers(): Promise<UserSummary[]>;
}
