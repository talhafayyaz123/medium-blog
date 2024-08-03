# Command Line Interface (CLI)

---

## Table of Contents <!-- omit in toc -->

- [Generate resource](#generate-resource)
  - [For relational database (PostgreSQL + TypeORM)](#for-relational-database-postgresql--typeorm)
  - [Property for relational database (PostgreSQL + TypeORM)](#property-for-relational-database-postgresql--typeorm)
- [FAQ](#faq)
  - [Error: Unable to connent to the newly created relational entity](#error-unable-to-connent-to-the-newly-created-relational-entity)

---

## Generate resource

Generate resource with the following commands:

### For relational database (PostgreSQL + TypeORM)

```bash
npm run generate:resource -- ResourceName
```

Example:

```bash
npm run generate:resource -- Category
```

### Property for relational database (PostgreSQL + TypeORM)

```bash
npm run add:property
```

It will initiate the terminal prompt to ask for property details.

## FAQ

### Error: Unable to connent to the newly created relational entity

When working with the start:dev script and the compiler is watching for changes, it may sometimes fail to compile newly generated resource files to JavaScript. An easy fix for this issue is to run the following command:

```bash
rm -rf ./dist
```

```bash
npm run build
```

And then you can use the start:dev or other command which you were using.

---

Previous: [Architecture](architecture.md)

Next: [Working with database](database.md)
