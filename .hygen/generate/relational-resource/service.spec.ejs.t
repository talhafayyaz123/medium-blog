---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { paginationOptions } from './__mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock';
import { <%= h.inflection.transform(name, ['pluralize']) %>Service } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service';
import { <%= name %>Repository } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';
import { Create<%= name %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';

describe('<%= h.inflection.transform(name, ['pluralize']) %>Service', () => {
  let service: <%= h.inflection.transform(name, ['pluralize']) %>Service;
  let <%= h.inflection.camelize(name, true) %>Repository: <%= name %>Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%= h.inflection.transform(name, ['pluralize']) %>Service,
        {
          provide: <%= name %>Repository,
          useValue: {
            create: jest.fn(),
            findAllWithPagination: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<<%= h.inflection.transform(name, ['pluralize']) %>Service>(<%= h.inflection.transform(name, ['pluralize']) %>Service);
    <%= h.inflection.camelize(name, true) %>Repository = module.get<<%= name %>Repository>(<%= name %>Repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a <%= name.toLowerCase() %>', async () => {
    const create<%= name %>Dto: Create<%= name %>Dto = {
      // provide necessary fields here
    };
    await service.create(create<%= name %>Dto);
    expect(<%= h.inflection.camelize(name, true) %>Repository.create).toHaveBeenCalledWith(create<%= name %>Dto);
  });

  it('should find all <%= h.inflection.pluralize(name.toLowerCase()) %> with pagination', async () => {
    await service.findAllWithPagination({ paginationOptions });
    expect(<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination).toHaveBeenCalledWith({
      paginationOptions
    });
  });

  it('should find one <%= name.toLowerCase() %> by ID', async () => {
    const id = 'testId';
    await service.findOne(id);
    expect(<%= h.inflection.camelize(name, true) %>Repository.findById).toHaveBeenCalledWith(id);
  });

  it('should update a <%= name.toLowerCase() %> by ID', async () => {
    const id = 'testId';
    const update<%= name %>Dto: Update<%= name %>Dto = {
      // provide necessary fields here
    };
    await service.update(id, update<%= name %>Dto);
    expect(<%= h.inflection.camelize(name, true) %>Repository.update).toHaveBeenCalledWith(id, update<%= name %>Dto);
  });

  it('should remove a <%= name.toLowerCase() %> by ID', async () => {
    const id = 'testId';
    await service.remove(id);
    expect(<%= h.inflection.camelize(name, true) %>Repository.remove).toHaveBeenCalledWith(id);
  });
});
