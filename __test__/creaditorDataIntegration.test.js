/* eslint-disable jest/expect-expect */
const request = require('supertest');
const app = require('../src/app');
const mongoDB = require('./testDBConfig');
const CreditorData = require('../src/Model/creditorDataModel');
const initialData = require('../initialDBSetup/initialData.json');

describe('Test the addLike method', () => {
  beforeAll(async () => {
    await mongoDB.connect();
  });

  afterAll(async () => {
    await mongoDB.disconnect();
  });

  beforeEach(async () => {
    await CreditorData.insertMany(initialData);
  });

  afterEach(async () => {
    await mongoDB.mongoose.connection.db.dropDatabase();
  });

  test('GET /creditorData', async () => {
    await request(app)
      .get('/creditorData')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(10);
        expect(response.body).toMatchObject(initialData);
      });
  });

  test('GET /creditorData/AMEX', async () => {
    await request(app)
      .get('/creditorData/AMEX')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(3);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0]).toHaveProperty('firstName');
        expect(response.body[0]).toHaveProperty('lastName');
        expect(response.body[0]).toHaveProperty('minPaymentPercentage');
        expect(response.body[0]).toHaveProperty('balance');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0].id).toBe(2);
        expect(response.body[0].creditorName).toBe('AMEX');
        expect(response.body[0].firstName).toBe('Suman');
        expect(response.body[0].lastName).toBe('Tester79');
        expect(response.body[0].minPaymentPercentage).toBe(2.0);
        expect(response.body[0].balance).toBe(2763.0);
      });
  });

  test('POST /creditorData/ Missing Field', async () => {
    const body = {
      creditorName: 'CBNA',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 2.0,
    };

    await request(app)
      .post('/creditorData')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('instancePath');
        expect(response.body[0]).toHaveProperty('schemaPath');
        expect(response.body[0]).toHaveProperty('keyword');
        expect(response.body[0]).toHaveProperty('params');
        expect(response.body[0]).toHaveProperty('message');
      });
  });

  test('POST /creditorData/ Incorrect Key', async () => {
    const body = {
      creditorName: 'CBNA',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 2.0,
      balance1: 15,
    };

    await request(app)
      .post('/creditorData')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('instancePath');
        expect(response.body[0]).toHaveProperty('schemaPath');
        expect(response.body[0]).toHaveProperty('keyword');
        expect(response.body[0]).toHaveProperty('params');
        expect(response.body[0]).toHaveProperty('message');
      });
  });

  test('POST /creditorData/', async () => {
    const body = {
      creditorName: 'CBNA',
      firstName: 'Suman',
      lastName: 'Tester79',
      minPaymentPercentage: 2.0,
      balance: 1363.0,
    };

    await request(app)
      .post('/creditorData')
      .send(body)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0]).toHaveProperty('firstName');
        expect(response.body[0]).toHaveProperty('lastName');
        expect(response.body[0]).toHaveProperty('minPaymentPercentage');
        expect(response.body[0]).toHaveProperty('balance');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0].creditorName).toBe('CBNA');
        expect(response.body[0].firstName).toBe('Suman');
        expect(response.body[0].lastName).toBe('Tester79');
        expect(response.body[0].minPaymentPercentage).toBe(2.0);
        expect(response.body[0].balance).toBe(1363.0);
      });

    await request(app)
      .get('/creditorData')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(11);
      });
  });

  test('PUT /creditorData/1', async () => {
    const body = {
      creditorName: 'Wells Fargo',
    };

    await request(app)
      .put('/creditorData/1')
      .send(body)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0]).toHaveProperty('firstName');
        expect(response.body[0]).toHaveProperty('lastName');
        expect(response.body[0]).toHaveProperty('minPaymentPercentage');
        expect(response.body[0]).toHaveProperty('balance');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0].creditorName).toBe('Wells Fargo');
        expect(response.body[0].firstName).toBe('Suman');
        expect(response.body[0].lastName).toBe('Tester79');
        expect(response.body[0].minPaymentPercentage).toBe(2.0);
        expect(response.body[0].balance).toBe(1363.0);
      });

    await request(app)
      .get('/creditorData')
      .expect(200)
      .then((response) => {
        expect(response.body[0].creditorName).toBe('Wells Fargo');
      });
  });

  test('PUT /creditorData/1 Incorrect Key', async () => {
    const body = {
      creditorName2: 'Wells Fargo',
    };

    await request(app)
      .put('/creditorData/1')
      .send(body)
      .expect(400)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty('instancePath');
        expect(response.body[0]).toHaveProperty('schemaPath');
        expect(response.body[0]).toHaveProperty('keyword');
        expect(response.body[0]).toHaveProperty('params');
        expect(response.body[0]).toHaveProperty('message');
      });
  });

  test('GET /creditorData/analysis', async () => {
    await request(app)
      .get('/creditorData/analysis')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(4);
        expect(response.body[0]).toHaveProperty('_id');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0]).toHaveProperty('firstName');
        expect(response.body[0]).toHaveProperty('lastName');
        expect(response.body[0]).toHaveProperty('minPaymentPercentage');
        expect(response.body[0]).toHaveProperty('balance');
        expect(response.body[0]).toHaveProperty('creditorName');
        expect(response.body[0].balance).toBeGreaterThan(2000);
        expect(response.body[0].minPaymentPercentage).toBeLessThanOrEqual(
          29.99
        );
        expect(response.body[1].balance).toBeGreaterThan(2000);
        expect(response.body[1].minPaymentPercentage).toBeLessThanOrEqual(
          29.99
        );
        expect(response.body[2].balance).toBeGreaterThan(2000);
        expect(response.body[2].minPaymentPercentage).toBeLessThanOrEqual(
          29.99
        );
        expect(response.body[3].balance).toBeGreaterThan(2000);
        expect(response.body[3].minPaymentPercentage).toBeLessThanOrEqual(
          29.99
        );
      });
  });
});
