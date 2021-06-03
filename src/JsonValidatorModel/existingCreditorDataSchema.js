const schema = {
  type: 'object',
  properties: {
    creditorName: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    minPaymentPercentage: { type: 'number' },
    balance: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};

module.exports = schema;
