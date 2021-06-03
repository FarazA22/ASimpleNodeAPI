const schema = {
  type: 'object',
  properties: {
    creditorName: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    minPaymentPercentage: { type: 'number' },
    balance: { type: 'number' },
  },
  required: [
    'creditorName',
    'firstName',
    'lastName',
    'minPaymentPercentage',
    'balance',
  ],
  additionalProperties: false,
};

module.exports = schema;
