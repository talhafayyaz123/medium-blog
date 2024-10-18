# Command Line Interface (CLI)

---

## Table of Contents <!-- omit in toc -->

- [Generate resource](#generate-resource)
  - [For relational database (PostgreSQL + TypeORM)](#for-relational-database-postgresql--typeorm)
  - [Property for relational database (PostgreSQL + TypeORM)](#property-for-relational-database-postgresql--typeorm)
- [FAQ](#faq)
  - [Error: Unable to connent to the newly created relational entity](#error-unable-to-connent-to-the-newly-created-relational-entity)
  - [Can I create forgein key properties using the add:property command?](#can-i-create-forgein-key-properties-using-the-addproperty-command)

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

This command will trigger a terminal prompt with the following options:

1. **Functionality Selection**: You can choose which functionalities (CRUD operations) you want to generate for the resource. The available functionalities are:

   - Create
   - Find All
   - Find One
   - Update
   - Delete

   Use the arrow keys to navigate and the spacebar to select multiple options. Press Enter key to move to next step.

2. **Add Test Case**: You will be prompted with a confirmation question:

   - "Do you want to add test cases and mock data?"

   If you choose "Yes", test case structure and mock data for the resource will also be generated along with the selected functionalities.

### Property for relational database (PostgreSQL + TypeORM)

```bash
npm run add:property
```

It will initiate the terminal prompt to ask for property details.

After the property is created, please check the DTO files and add the relevant imports. Otherwise, the file will have errors.

---

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

### Can I create forgein key properties using the add:property command?

Technically, yes and no. While you can generate a simple property without any relations using the `add:property` command, you will need to manually handle the foreign key relations. This includes writing the relation yourself, adding the relevant validation checks in the DTO, and updating other relevant pieces of code. Essentially, most of the work for handling foreign key relations will need to be done manually.

---

Previous: [Architecture](architecture.md)

Next: [Working with database](database.md)
