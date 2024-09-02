import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { UserSummary } from '@src/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { UserSummaryMapper } from '@src/views/infrastructure/persistence/relational/mappers/user.summary.mapper';
import { UserSummaryViewRepository } from '@src/views/infrastructure/persistence/relational/user-summary-view.repository';

@Injectable()
export class UserSummaryViewRelationalRepository
  implements UserSummaryViewRepository
{
  constructor(
    @InjectRepository(UserSummaryViewEntity)
    private readonly userSummaryRepository: Repository<UserSummaryViewEntity>,
  ) {}

  getActiveUsersQueryBuilder(): SelectQueryBuilder<UserSummaryViewEntity> {
    return this.userSummaryRepository
      .createQueryBuilder('user_summary_view')
      .where('user_summary_view.status_name = :statusName', {
        statusName: 'Active',
      });
  }

  async getActiveUsers(): Promise<UserSummary[]> {
    const users = await this.userSummaryRepository.find();
    return users.map((user) => UserSummaryMapper.toDomain(user));
  }
}
