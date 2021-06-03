// To set-up intial DB, execute this script in node
// stop the node server after data is created
require('dotenv').config();

const CreditorData = require('../src/Model/creditorDataModel');

const data = require('./initialData.json');

CreditorData.insertMany(data)
  .then(() => {
    console.log('Initial Data Created');
  })
  .catch((err) => {
    console.log(err);
  });
