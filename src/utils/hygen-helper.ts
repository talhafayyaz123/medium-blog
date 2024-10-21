const customTypeMapping: { [key: string]: string } = {
  int4: 'number',
  int8: 'number',
  int16: 'number',
  int32: 'number',
  uint8: 'number',
  uint16: 'number',
  uint32: 'number',
  bigint: 'bigint',
  char: 'string',
  longtext: 'string',
  smallint: 'number',
  // Add more custom mappings as needed
};

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
      if (customTypeMapping.hasOwnProperty(type)) {
        console.log(customTypeMapping.hasOwnProperty(type));
        return customTypeMapping[type];
      }
      return 'any';
  }
};

export const getPropertyType = (type: string): string => {
  switch (type) {
    case 'varchar':
      return 'String';
    case 'text':
      return 'String';
    case 'uuid':
      return 'String';
    case 'decimal':
      return 'Number';
    case 'char':
    case 'longtext':
      return 'String'; // Return type as string
    case 'int':
      return 'Number';
    case 'float':
      return 'Number';
    case 'double':
      return 'Number';
    case 'int4':
    case 'int8':
    case 'int16':
    case 'int32':
    case 'uint8':
    case 'uint16':
    case 'uint32':
    case 'smallint':
      return 'Number'; // Return type as number
    case 'boolean':
      return 'Boolean'; // Return type as boolean
    case 'timestamp':
    case 'date':
      return 'Date'; // Return type as Date
    case 'json':
      return 'Object'; // Return type as object
    default:
      return type; // Default fallback
  }
};
