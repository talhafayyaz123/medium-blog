import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsForeignKeyExistsConstraint } from './is-foreign-key-exists.validator';

@Module({})
export class ValidatorsModule {
  static forFeature(entities: any[]): DynamicModule {
    return {
      module: ValidatorsModule,
      imports: [TypeOrmModule.forFeature(entities)],
      providers: [IsForeignKeyExistsConstraint],
      exports: [IsForeignKeyExistsConstraint],
    };
  }
}
