export const getType = (type: string): string => {
  switch (type) {
    case 'varchar':
    case 'text':
    case 'uuid':
    case 'decimal':
      return 'string';
    case 'int':
    case 'float':
    case 'double':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'timestamp':
    case 'date':
      return 'Date';
    case 'json':
      return 'object';
    default:
      return 'any';
  }
};
