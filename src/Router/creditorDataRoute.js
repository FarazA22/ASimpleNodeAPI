const express = require('express');

const router = express.Router();
const {
  getAllCreditorData,
  getCreditorDataByName,
  validateJSON,
  createNewCreditorDataEntry,
  updateCreditorData,
  getCreditAnalysis,
  createReturnObject,
  sendResponse,
} = require('../Controller/creditorDataController');

// Credit Analysis Endpoint To Return Data That Meets The Following Criteria
// Creditor Balance Is Over 2000
// Creditor Min Pay Percentage Shouldn't Exceed 29.99%
router.get('/analysis', getCreditAnalysis, createReturnObject, sendResponse);

// Get All Data
router.get('/', getAllCreditorData, createReturnObject, sendResponse);

// Creditor Data By Creditor Name
router.get(
  '/:creditorName',
  getCreditorDataByName,
  createReturnObject,
  sendResponse
);

// Add A New Creditor Entry
router.post(
  '/',
  validateJSON,
  createNewCreditorDataEntry,
  createReturnObject,
  sendResponse
);

// Update An Existing Creditor Entry (Partial Or Full Update)
router.put(
  '/:id',
  validateJSON,
  updateCreditorData,
  createReturnObject,
  sendResponse
);

module.exports = router;
