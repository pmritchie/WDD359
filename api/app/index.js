// load in the imports
const error = require('debug')('api:error');
const express = require('express');
// create an express app
const app = express();
// four params are required to mark this as a error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;