---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
before: "// @custom-inject-point"
---

@ApiProperty()
<%= property %>: <%= type %>;
