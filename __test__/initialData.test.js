/* eslint-disable no-loop-func */
const initialData = require('../initialDBSetup/initialData.json');

test('the initial data is correct', () => {
  expect(initialData).toMatchSnapshot();
  expect(initialData).toHaveLength(10);
  expect(
    initialData.map((data) => {
      return data.creditorName;
    })
  ).toEqual([
    'CBNA',
    'AMEX',
    'AMEX',
    'AMEX',
    'DISCOVERBANK',
    'CAPITAL ONE',
    'CAPITAL ONE',
    'CAPITAL ONE',
    'CBNA',
    'CBNA',
  ]);
});

for (let i = 0; i < initialData.length; i += 1) {
  test(`creditor data ${i} should have properties (id, creditorName, firstName, lastName, minPaymentPercentage, balance)`, () => {
    expect(initialData[i]).toHaveProperty('id');
    expect(initialData[i]).toHaveProperty('creditorName');
    expect(initialData[i]).toHaveProperty('firstName');
    expect(initialData[i]).toHaveProperty('lastName');
    expect(initialData[i]).toHaveProperty('minPaymentPercentage');
    expect(initialData[i]).toHaveProperty('balance');
  });
}
