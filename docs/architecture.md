# Architecture

---

## Table of Contents <!-- omit in toc -->

- [Hexagonal Architecture](#hexagonal-architecture)
- [Motivation](#motivation)
- [Description of the module structure](#description-of-the-module-structure)
- [Recommendations](#recommendations)
  - [Repository](#repository)
- [Pitfalls](#pitfalls)
- [FAQ](#faq)
  - [Is there a way to generate a new resource (controller, service, DTOs, etc) with Hexagonal Architecture?](#is-there-a-way-to-generate-a-new-resource-controller-service-dtos-etc-with-hexagonal-architecture)
  - [I don't want to use Hexagonal Architecture. How can I use a traditional (three-tier) architecture for NestJS?](#i-dont-want-to-use-hexagonal-architecture-how-can-i-use-a-traditional-three-tier-architecture-for-nestjs)
- [Links](#links)

---

## Hexagonal Architecture

NestJS Boilerplate is based on [Hexagonal Architecture](<https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>). This architecture is also known as Ports and Adapters.

![Hexagonal Architecture Diagram](https://github.com/brocoders/nestjs-boilerplate/assets/6001723/6a6a763e-d1c9-43cc-910a-617cda3a71db)

## Benefits of Using Hexagonal Architecture

### Benefits for Database Interactions

#### 1. Decoupled Business Logic and Data Access

**Benefit**: Business logic is separated from data access code, making it easier to modify or replace the database without impacting the core application logic.
**Analogy**: It's like having a universal remote control for different TV brands. You can switch TVs without needing to learn a new set of controls, as the remote's interface remains the same.

#### 2. Enhanced Testability

**Benefit**: With database interactions abstracted behind interfaces, it's easier to mock the database during testing, leading to more reliable and faster tests.
**Analogy**: Imagine practicing chess moves on a digital chessboard that lets you simulate any scenario without the need for physical pieces. This allows you to test different strategies quickly and effectively.

### Benefits for Third-Party Integrations

Given this project will involve a lot of 3rd party integrations, so it can pay off there as well.

#### 4. Isolated and Replaceable Integrations

**Benefit**: Third-party integrations are modular and can be easily swapped out without affecting the core business logic.
**Analogy**: Think of the third-party services as plug-and-play USB devices. You can unplug one and plug in another without needing to change the computer's operating system or applications.

#### 5. Improved Testability and Reliability

**Benefit**: Abstracting third-party services makes it easier to create mock versions, leading to more reliable and faster testing.
**Analogy**: It's like using a flight simulator to train pilots. The simulator provides a safe and controlled environment to test various scenarios without the risks and costs associated with actual flights.

## Description of the module structure

```txt
.
├── domain
│   └── [DOMAIN_ENTITY].ts
├── dto
│   ├── create.dto.ts
│   ├── find-all.dto.ts
│   └── update.dto.ts
├── infrastructure
│   └── persistence
│       ├── document
│       │   ├── document-persistence.module.ts
│       │   ├── entities
│       │   │   └── [SCHEMA].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       ├── relational
│       │   ├── entities
│       │   │   └── [ENTITY].ts
│       │   ├── mappers
│       │   │   └── [MAPPER].ts
│       │   ├── relational-persistence.module.ts
│       │   └── repositories
│       │       └── [ADAPTER].repository.ts
│       └── [PORT].repository.ts
├── controller.ts
├── module.ts
└── service.ts
```

`[DOMAIN ENTITY].ts` represents an entity used in the business logic. Domain entity has no dependencies on the database or any other infrastructure.

`[SCHEMA].ts` represents the **database structure**. It is used in the document-oriented database (MongoDB).

`[ENTITY].ts` represents the **database structure**. It is used in the relational database (PostgreSQL).

`[MAPPER].ts` is a mapper that converts **database entity** to **domain entity** and vice versa.

`[PORT].repository.ts` is a repository **port** that defines the methods for interacting with the database.

`[ADAPTER].repository.ts` is a repository that implements the `[PORT].repository.ts`. It is used to interact with the database.

`infrastructure` folder - contains all the infrastructure-related components such as `persistence`, `uploader`, `senders`, etc.

Each component has `port` and `adapters`. `Port` is interface that define the methods for interacting with the infrastructure. `Adapters` are implementations of the `port`.

## Recommendations

### Repository

Don't try to create universal methods in the repository because they are difficult to extend during the project's life. Instead of this create methods with a single responsibility.

```typescript
// ❌
export class UsersRelationalRepository implements UserRepository {
  async find(condition: UniversalConditionInterface): Promise<User> {
    // ...
  }
}

// ✅
export class UsersRelationalRepository implements UserRepository {
  async findByEmail(email: string): Promise<User> {
    // ...
  }

  async findByRoles(roles: string[]): Promise<User> {
    // ...
  }

  async findByIds(ids: string[]): Promise<User> {
    // ...
  }
}
```

## Pitfalls

Hexagonal Architecture can take more effort to implement, but it gives more flexibility and scalability. [You still can use Three-tier architecture](#i-dont-want-to-use-hexagonal-architecture-how-can-i-use-a-traditional-three-tier-architecture-for-nestjs), but we recommend using Hexagonal Architecture. Try to create resources via our [CLI](cli.md), you will be sure that makes the same time (maybe even less 🤔) as Three-tier architecture.

---

## FAQ

### Is there a way to generate a new resource (controller, service, DTOs, etc) with Hexagonal Architecture?

Yes, you can use the [CLI](cli.md) to generate a new resource with Hexagonal Architecture.

### I don't want to use Hexagonal Architecture. How can I use a traditional (three-tier) architecture for NestJS?

You still can use [Three-tier Architecture](https://en.wikipedia.org/wiki/Multitier_architecture#Three-tier_architecture) `[controllers] -> [services] -> [data access]` near [Hexagonal Architecture](#hexagonal-architecture).

Database example: Just keep the existing approach of getting data from the database for auth, files, etc, as is (with Hexagonal Architecture), but for new modules use repositories from TypeORM directly in [services](https://docs.nestjs.com/providers#services). Entities and Schemas are ready for this.

---

## Links

- [Dependency Inversion Principle](https://trilon.io/blog/dependency-inversion-principle) with NestJS.

---

Previous: [Installing and Running](installing-and-running.md)

Next: [Command Line Interface](cli.md)
