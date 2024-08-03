import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsForeignKeyExistsConstraint
  implements ValidatorConstraintInterface
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [EntityClass, propertyName] = args.constraints;
    const repository = this.dataSource.getRepository(EntityClass);
    const entity = await repository.findOne({
      where: { [propertyName]: value },
    });
    return !!entity;
  }

  defaultMessage(args: ValidationArguments) {
    const [EntityClass, propertyName] = args.constraints;
    return `${propertyName} does not exist in ${EntityClass.name}`;
  }
}

export function IsForeignKeyExists(
  EntityClass: new () => any,
  propertyName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyKey: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [EntityClass, propertyName],
      validator: IsForeignKeyExistsConstraint,
    });
  };
}
