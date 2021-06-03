const mongoose = require('mongoose');

const { Schema } = mongoose;

const creditorDataSchema = new Schema({
  id: { type: Number, required: true },
  creditorName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  minPaymentPercentage: { type: Number, required: true },
  balance: { type: Number, required: true },
});

const CreditorData = mongoose.model('CreditorData', creditorDataSchema);

module.exports = CreditorData;
