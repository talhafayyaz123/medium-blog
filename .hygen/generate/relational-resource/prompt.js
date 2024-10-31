module.exports = [
  {
    type: 'confirm',
    name: 'isAddTestCase',
    message: 'Do you want to add test cases and mock data?',
    initial: true,
  },
  {
    type: 'multiselect',
    name: 'functionalities',
    message: 'Select the functionalities you want to include:',
    choices: [
      { name: 'create', value: 'create' },
      { name: 'findAll', value: 'findAll' },
      { name: 'findOne', value: 'findOne' },
      { name: 'update', value: 'update' },
      { name: 'delete', value: 'delete' },
    ],
  },
  {
    type: 'select',
    name: 'type',
    message: 'Select type',
    choices: [
      'varchar',
      'text',
      'uuid',
      'int',
      'float',
      'double',
      'decimal',
      'timestamp',
      'date',
      'custom',
    ],
  },
  {
    type: 'input',
    name: 'example',
    message:
      "Provide an example value for the default property (e.g. 'John Doe'):",
    validate: (input) => {
      if (!input.trim()) {
        return 'Property example is required';
      }
      return true;
    },
    format: (input) => input.trim(),
  },
];
