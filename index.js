require('express-async-errors');
require('dotenv').config();
const express = require('express');
const winston = require('winston');
const app = express();
const cors = require('cors')

app.use(cors());

require('./Startup/validation')();
require('./Startup/logging')();
require('./Startup/config')();
require('./Startup/routes')(app);
require('./Startup/db')();
require('./Startup/prod')(app);

// Check for test environment and load appropriate .env file
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config();
}

// Ensure the server starts only once
if (!module.parent) {
  const port = process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT || 3000;
  const server = app.listen(port, () => {
    const message = `Server is listening on port: ${port}`;
    winston.info(message);
    console.log(message);
  });

  module.exports = server;
} else {
  module.exports = app;
}
