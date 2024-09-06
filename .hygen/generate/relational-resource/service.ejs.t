---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { Create<%= name %>Dto } from './dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from './dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { <%= name %>AbstractRepository } from './infrastructure/persistence/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.abstract.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { <%= name %> } from './domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';
import { NOT_FOUND, UNPROCESSABLE_ENTITY } from '@src/common/exceptions'

@Injectable()
export class <%= h.inflection.transform(name, ['pluralize']) %>Service {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Repository: <%= name %>AbstractRepository) {}

  create(create<%= name %>Dto: Create<%= name %>Dto) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.create(create<%= name %>Dto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: <%= name %>['id']) {
    return this.findAndValidate('id', id);
  }

  update(id: <%= name %>['id'], update<%= name %>Dto: Update<%= name %>Dto) {
    const <%= h.inflection.camelize(name, true) %> =  this.<%= h.inflection.camelize(name, true) %>Repository.update(id, update<%= name %>Dto)
    if(!<%= h.inflection.camelize(name, true) %>) {
      throw NOT_FOUND('<%= name %>', { id })
    }
    return ;
  }

  remove(id: <%= name %>['id']) {
    return this.<%= h.inflection.camelize(name, true) %>Repository.remove(id);
  }
  
  async findAndValidate(field, value, fetchRelations = false) {
    const repoFunction = `findBy${field.charAt(0).toUpperCase()}${field.slice(1)}${fetchRelations ? 'WithRelations' : ''}`; // captilize first letter of the field name
    if (typeof this.<%= h.inflection.camelize(name, true) %>Repository[repoFunction] !== 'function') {
      throw UNPROCESSABLE_ENTITY(
        `Method ${repoFunction} not found on <%= h.inflection.camelize(name, true) %> repository.`,
        field,
      );
    }
  
    const <%= h.inflection.camelize(name, true) %> = await this.<%= h.inflection.camelize(name, true) %>Repository[repoFunction](value);
    if (!<%= h.inflection.camelize(name, true) %>) {
      throw NOT_FOUND('<%= name %>', { [field]: value });
    }
    return <%= h.inflection.camelize(name, true) %>;
  }

}
