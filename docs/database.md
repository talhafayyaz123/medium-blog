# Work with database

---

## Table of Contents <!-- omit in toc -->

- [About databases](#about-databases)
- [DB tables naming conventions](#db-tables-naming-conventions)
  - [Reason 1: Convenience](#reason-1-convenience)
  - [Reason 2: Aesthetic and Order](#reason-2-aesthetic-and-order)
    - [Reason 3: Simplicity](#reason-3-simplicity)
  - [Reason 4: Globalization](#reason-4-globalization)
- [DB columns naming convention](#db-columns-naming-convention)
- [Working with database schema (TypeORM)](#working-with-database-schema-typeorm)
  - [Create a new migration without existing entities](#create-a-new-migration-without-existing-entities)
  - [Generate migration from existing entities](#generate-migration-from-existing-entities)
  - [Run migration](#run-migration)
  - [Revert migration](#revert-migration)
  - [Drop all tables in database](#drop-all-tables-in-database)
- [Seeding (TypeORM)](#seeding-typeorm)
  - [Creating seeds (TypeORM)](#creating-seeds-typeorm)
  - [Run seed (TypeORM)](#run-seed-typeorm)
  - [Factory and Faker (TypeORM)](#factory-and-faker-typeorm)
- [Performance optimization (PostgreSQL + TypeORM)](#performance-optimization-postgresql--typeorm)
  - [Indexes and Foreign Keys](#indexes-and-foreign-keys)
  - [Max connections](#max-connections)

---

## About databases

This project supports PostgreSQL and uses the [Hexagonal Architecture](architecture.md#hexagonal-architecture) to work with it.

## DB tables naming conventions

We will use singular names for all database tables due to the following reasons:

### Reason 1: Convenience

It is easier to come up with singular names than with plural ones. Objects can have irregular plurals or no plural at all, but will always have a singular form (with few exceptions like News).

Examples:

- Customer
- Order
- User
- Status
- News

### Reason 2: Aesthetic and Order

Especially in master-detail scenarios, singular names read better, align better by name, and have a more logical order (Master first, Detail second):

1. Order
2. OrderDetail

Compared to:

1. OrderDetails
2. Orders

#### Reason 3: Simplicity

Put all together, Table Names, Primary Keys, Relationships, Entity Classes... it is better to be aware of only one name (singular) instead of two (singular class, plural table, singular field, singular-plural master-detail...):

Examples:

- Customer
- Customer.CustomerID
- CustomerAddress
- public class Customer { ... }
- `SELECT * FROM Customer WHERE CustomerID = 100`

Once you know you are dealing with "Customer", you can be sure you will use the same word for all of your database interaction needs.

### Reason 4: Globalization

The world is getting smaller, and you may have a team of different nationalities. Not everybody has English as a native language. It would be easier for a non-native English language programmer to think of "Repository" than of "Repositories", or "Status" instead of "Statuses". Having singular names can lead to fewer errors caused by typos, save time by not having to think "is it Child or Children?", hence improving productivity.

## DB columns naming convention

[Don't use upper case](https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_upper_case_table_or_column_names) letters in the column or table names.

## Working with database schema (TypeORM)

### Create a new migration without existing entities

E.g.

`npm run migration:create -- ./src/database/migrations/MakeTagNameUnique`

### Generate migration from existing entities

1. Create entity file with extension `.entity.ts`. For example `post.entity.ts`:

   ```ts
   // /src/posts/infrastructure/persistence/relational/entities/post.entity.ts

   import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
   import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

   @Entity()
   export class Post extends EntityRelationalHelper {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     title: string;

     @Column()
     body: string;

     // Here any fields that you need
   }
   ```

1. Next, generate migration file:

   ```bash
   npm run migration:generate -- src/database/migrations/CreatePostTable
   ```

1. Apply this migration to database via [npm run migration:run](#run-migration).

### Run migration

```bash
npm run migration:run
```

### Revert migration

```bash
npm run migration:revert
```

### Drop all tables in database

```bash
npm run schema:drop
```

---

## Seeding (TypeORM)

### Creating seeds (TypeORM)

1. Create seed file with `npm run seed:create:relational -- --name=Post`. Where `Post` is name of entity.
1. Go to `src/database/seeds/relational/post/post-seed.service.ts`.
1. In `run` method extend your logic.
1. Run [npm run seed:run:relational](#run-seed-typeorm)

### Run seed (TypeORM)

```bash
npm run seed:run:relational
```

### Factory and Faker (TypeORM)

1. Install faker:

   ```bash
   npm i --save-dev @faker-js/faker
   ```

1. Create `src/database/seeds/relational/user/user.factory.ts`:

   ```ts
   import { faker } from '@faker-js/faker';
   import { RoleEnum } from '../../../../roles/roles.enum';
   import { StatusEnum } from '../../../../statuses/statuses.enum';
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
   import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
   import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

   @Injectable()
   export class UserFactory {
     constructor(
       @InjectRepository(UserEntity)
       private repositoryUser: Repository<UserEntity>,
       @InjectRepository(RoleEntity)
       private repositoryRole: Repository<RoleEntity>,
       @InjectRepository(StatusEntity)
       private repositoryStatus: Repository<StatusEntity>,
     ) {}

     createRandomUser() {
       // Need for saving "this" context
       return () => {
         return this.repositoryUser.create({
           firstName: faker.person.firstName(),
           lastName: faker.person.lastName(),
           email: faker.internet.email(),
           password: faker.internet.password(),
           role: this.repositoryRole.create({
             id: RoleEnum.user,
             name: 'User',
           }),
           status: this.repositoryStatus.create({
             id: StatusEnum.active,
             name: 'Active',
           }),
         });
       };
     }
   }
   ```

1. Make changes in `src/database/seeds/relational/user/user-seed.service.ts`:

   ```ts
   // Some code here...
   import { UserFactory } from './user.factory';
   import { faker } from '@faker-js/faker';

   @Injectable()
   export class UserSeedService {
     constructor(
       // Some code here...
       private userFactory: UserFactory,
     ) {}

     async run() {
       // Some code here...

       await this.repository.save(
         faker.helpers.multiple(this.userFactory.createRandomUser(), {
           count: 5,
         }),
       );
     }
   }
   ```

1. Make changes in `src/database/seeds/relational/user/user-seed.module.ts`:

   ```ts
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';

   import { UserSeedService } from './user-seed.service';
   import { UserFactory } from './user.factory';

   import { UserEntity } from '../../../../users/infrastructure/persistence/relational/entities/user.entity';
   import { RoleEntity } from '../../../../roles/infrastructure/persistence/relational/entities/role.entity';
   import { StatusEntity } from '../../../../statuses/infrastructure/persistence/relational/entities/status.entity';

   @Module({
     imports: [TypeOrmModule.forFeature([UserEntity, Role, Status])],
     providers: [UserSeedService, UserFactory],
     exports: [UserSeedService, UserFactory],
   })
   export class UserSeedModule {}
   ```

1. Run seed:

   ```bash
   npm run seed:run
   ```

---

## Performance optimization (PostgreSQL + TypeORM)

### Indexes and Foreign Keys

Don't forget to create `indexes` on the Foreign Keys (FK) columns (if needed), because by default PostgreSQL [does not automatically add indexes to FK](https://stackoverflow.com/a/970605/18140714).

### Max connections

Set the optimal number of [max connections](https://node-postgres.com/apis/pool) to database for your application in `/.env`:

```txt
DATABASE_MAX_CONNECTIONS=100
```

You can think of this parameter as how many concurrent database connections your application can handle.

---

Previous: [Command Line Interface](cli.md)

Next: [Auth](auth.md)
