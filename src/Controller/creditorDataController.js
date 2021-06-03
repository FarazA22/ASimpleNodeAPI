const Ajv = require('ajv');
const CreditorData = require('../Model/creditorDataModel');
const newCreditorDataSchema = require('../JsonValidatorModel/newCreditorDataSchema');
const existingCreditorDataSchema = require('../JsonValidatorModel/existingCreditorDataSchema');

const ajv = new Ajv();
const validateNewCreditor = ajv.compile(newCreditorDataSchema);
const validateExistingCreditor = ajv.compile(existingCreditorDataSchema);

const getAllCreditorData = async (req, res, next) => {
  try {
    const allCreditorData = await CreditorData.find();
    res.locals.queryResults = allCreditorData;
    next();
  } catch (error) {
    next(error);
  }
};

const getCreditorDataByName = async (req, res, next) => {
  try {
    const { creditorName } = req.params;
    const allCreditorData = await CreditorData.find({ creditorName });
    res.locals.queryResults = allCreditorData;
    next();
  } catch (error) {
    next(error);
  }
};

const validateJSON = (req, res, next) => {
  if (req.method === 'POST') {
    const valid = validateNewCreditor(req.body);
    if (valid) next();
    else {
      res.status(400).json(validateNewCreditor.errors);
    }
  }

  if (req.method === 'PUT') {
    const valid = validateExistingCreditor(req.body);
    if (valid) next();
    else {
      res.status(400).json(validateExistingCreditor.errors);
    }
  }
};

const createNewCreditorDataEntry = async (req, res, next) => {
  try {
    const { creditorName, firstName, lastName, minPaymentPercentage, balance } =
      req.body;
    const count = await CreditorData.countDocuments();
    const id = count + 1;

    const result = await CreditorData.create({
      id,
      creditorName,
      firstName,
      lastName,
      minPaymentPercentage,
      balance,
    });

    res.locals.queryResults = [result];
    next();
  } catch (error) {
    next(error);
  }
};

const updateCreditorData = async (req, res, next) => {
  try {
    const query = { id: req.params.id };
    const updatedDocument = await CreditorData.findOneAndUpdate(
      query,
      req.body,
      {
        useFindAndModify: false,
        new: true,
      }
    );
    res.locals.queryResults = [updatedDocument];
    next();
  } catch (error) {
    next(error);
  }
};

const getCreditAnalysis = async (req, res, next) => {
  try {
    const filteredCreditorData = await CreditorData.find({
      minPaymentPercentage: { $lte: 29.99 },
      balance: { $gt: 2000 },
    });
    res.locals.queryResults = filteredCreditorData;
    next();
  } catch (error) {
    next(error);
  }
};

const createReturnObject = (req, res, next) => {
  try {
    res.locals.result = res.locals.queryResults.map((obj) => {
      const {
        _id,
        id,
        creditorName,
        firstName,
        lastName,
        minPaymentPercentage,
        balance,
      } = obj;
      return {
        _id,
        id,
        creditorName,
        firstName,
        lastName,
        minPaymentPercentage,
        balance,
      };
    });
    next();
  } catch (error) {
    next(error);
  }
};

const sendResponse = (req, res) => {
  return res.status(200).json(res.locals.result);
};

module.exports = {
  getAllCreditorData,
  sendResponse,
  createReturnObject,
  getCreditorDataByName,
  createNewCreditorDataEntry,
  validateJSON,
  updateCreditorData,
  getCreditAnalysis,
};
