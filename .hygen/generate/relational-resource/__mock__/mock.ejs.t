---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/__mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock.ts
---
import { IPaginationOptions } from "@src/utils/types/pagination-options";
import { Create<%= name %>Dto } from '@src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';
import { Update<%= name %>Dto } from '@src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/update-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto';

// __mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock.ts
export const paginationOptions: IPaginationOptions = {
    page: 1,
    limit: 10,
};

export const mockCreate<%= name %>Dto: Create<%= name %>Dto = {
    // provide necessary fields here
};

export const mockUpdate<%= name %>Dto: Update<%= name %>Dto = {
    // provide necessary fields here
};
