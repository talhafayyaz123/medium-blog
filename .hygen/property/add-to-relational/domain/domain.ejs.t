---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
before: "// @custom-inject-point"
---

@ApiProperty()
<%= h.inflection.camelize(property, true) %>: <%= h.getType(type) %>;
