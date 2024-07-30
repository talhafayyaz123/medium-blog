module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "Entity name (e.g. 'User')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Entity name is required';
      }

      return true;
    },
    format: (input) => {
      return input.trim();
    },
  },
  {
    type: 'input',
    name: 'property',
    message: "Property name (e.g. 'firstName')",
    validate: (input) => {
      if (!input.trim()) {
        return 'Property name is required';
      }

      return true;
    },
    format: (input) => {
      return input.trim();
    },
  },
  {
    type: 'select',
    name: 'type',
    choices: [
      'varchar', // varchar
      'text', // text
      'uuid', // uuid
      'int', // int
      'float', // float
      'double', // double
      'decimal', // decimal
      'boolean', // boolean
      'timestamp', // timestamp
      'date', // date
      'json', // json
    ],
  },
  {
    type: 'confirm',
    name: 'isAddToDto',
    message: 'Add to DTO?',
    initial: true,
  },
];
