/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const helmet = require('helmet'); // --> Helmet is a security module that manages incoming HTTP messages
require('dotenv').config();
const creditorData = require('./Router/creditorDataRoute'); // --> Importing a Router File

const app = express(); // --> Invoking the createApplication function that is exported from Express Module
app.use(helmet()); // --> helmet middleware will run every server call

app.use(express.json()); // --> parses incoming request with JSON payloads
app.use(express.urlencoded({ extended: false })); // --> parses incoming request with urlencoded payloads

// ROUTES
app.use('/creditorData', creditorData); // --> creditorData Route

/*
 * SET-UP 404 RESPONSE
 * -------------------
 * In Express, 404 responses are not the result of an error, so the error-handler middleware will not capture them
 * Basically, Express has executed all middleware functions and routes and found none of them responded
 *
 */
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "You're received a 404 Error, the server can not find the requested resource"
    );
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
