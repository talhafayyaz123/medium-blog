import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { UserSummary } from '@src/views/domain/user-summary';
import { UserSummaryViewEntity } from '@src/views/infrastructure/persistence/relational/entities/user-summary-view.entity';
import { UserSummaryMapper } from '@src/views/infrastructure/persistence/relational/mappers/user.summary.mapper';
import { USER_SUMMARY_VIEW } from '@src/views/infrastructure/persistence/view.consts';
import { ViewsRepository } from '@src/views/infrastructure/persistence/view.repository';

@Injectable()
export class ViewsRelationalRepository implements ViewsRepository {
  constructor(
    @InjectRepository(UserSummaryViewEntity)
    private readonly userSummaryRepository: Repository<UserSummaryViewEntity>,
  ) {}

  getUsersSummaryView(): SelectQueryBuilder<UserSummaryViewEntity> {
    return this.userSummaryRepository.createQueryBuilder(
      USER_SUMMARY_VIEW.name,
    );
  }

  async getUsersSummary(): Promise<UserSummary[]> {
    const users = await this.userSummaryRepository.find();
    return users.map((user) => UserSummaryMapper.toDomain(user));
  }
}
