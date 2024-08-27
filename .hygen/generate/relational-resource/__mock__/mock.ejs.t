---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/__mock__/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.mock.ts
---
import { IPaginationOptions } from "@src/utils/types/pagination-options";

// __mock__/<%= name %>.mock.ts
export const paginationOptions: IPaginationOptions = {
    page: 1,
    limit: 10,
};
