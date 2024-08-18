import { Module } from '@nestjs/common';
import { TypeORMTransactionManager } from './transaction-manager/typeorm-transaction-manager';
import { TransactionManagerPort } from './transaction-manager/transaction-manager.port';
import { DatabaseHelperRepository } from './database-helper';

@Module({
  providers: [
    {
      provide: TransactionManagerPort,
      useClass: TypeORMTransactionManager,
    },
    DatabaseHelperRepository,
  ],
  exports: [DatabaseHelperRepository],
})
export class DatabaseHelperModule {}
