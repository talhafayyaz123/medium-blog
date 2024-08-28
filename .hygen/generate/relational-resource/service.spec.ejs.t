---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.spec.ts
---
import { Test, TestingModule } from '@nestjs/testing';
import { paginationOptions, mock<%= name %>,mockCreate<%= name %>Dto, mockUpdate<%= name %>Dto } from './__mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock';
import { <%= h.inflection.transform(name, ['pluralize']) %>Service } from './<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service';
import { <%= name %>Repository } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.repository';

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
    await service.create(mockCreate<%= name %>Dto);
    expect(<%= h.inflection.camelize(name, true) %>Repository.create).toHaveBeenCalledWith(mockCreate<%= name %>Dto);
  });

  it('should find all <%= h.inflection.pluralize(name.toLowerCase()) %> with pagination', async () => {
    await service.findAllWithPagination({ paginationOptions });
    expect(<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination).toHaveBeenCalledWith({
      paginationOptions
    });
  });

  it('should return a bat when found by id', async () => {
    const id = mock<%= name %>.id;
    jest.spyOn(<%= h.inflection.camelize(name, true) %>Repository, 'findById').mockResolvedValue(mock<%= name %>);
    const result = await service.findOne(id);

    expect(<%= h.inflection.camelize(name, true) %>Repository.findById).toHaveBeenCalledWith(id);
    expect(result).toEqual(mock<%= name %>);
  });

  it('should update a <%= name.toLowerCase() %> by ID', async () => {
    const id = mock<%= name %>.id;
    jest.spyOn(<%= h.inflection.camelize(name, true) %>Repository, 'update').mockResolvedValue(mock<%= name %>);
    await service.update(id, mockUpdate<%= name %>Dto);
    expect(<%= h.inflection.camelize(name, true) %>Repository.update).toHaveBeenCalledWith(id, mockUpdate<%= name %>Dto);
  });

  it('should remove a <%= name.toLowerCase() %> by ID', async () => {
    const id = 'testId';
    await service.remove(id);
    expect(<%= h.inflection.camelize(name, true) %>Repository.remove).toHaveBeenCalledWith(id);
  });
});
