---
inject: true
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/dto/create-<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.dto.ts
before: "// @custom-inject-point"
---

<% if (isAddToDto) { -%>
  @ApiProperty()
  <% if (h.getType(type) === 'string') { -%>
  @IsString()
  <% } else if (h.getType(type) === 'number') { -%>
  @IsNumber()
  <% } else if (h.getType(type) === 'boolean') { -%>
  @IsBoolean()
  <% } else if (h.getType(type) === 'Date') { -%>
  @IsDate()
  <% } else if (h.getType(type) === 'object') { -%>
  @IsObject()
  <% } -%>
  <%= property %>: <%= h.getType(type) %>;
<% } -%>
