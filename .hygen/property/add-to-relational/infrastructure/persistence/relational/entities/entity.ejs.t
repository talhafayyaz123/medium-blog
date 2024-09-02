---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
after: "export class"
---

@Column({ type: '<%= type %>' })
<%= property %>: <%= h.getType(type) %>;
