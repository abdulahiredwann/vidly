require('express-async-errors')
require('dotenv').config()
const express = require('express');
const app = express();
const winston = require('winston')
require('./Startup/validation')()
require('./Startup/logging')()
require('./Startup/config')()
require('./Startup/routes')(app)
require('./Startup/db')()
require('./Startup/prod')(app)

// index.js

const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

// Rest of your application code...

const port = process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT || 3000;
const server = app.listen(port, () => {
    const message = `Server is listening on port: ${port}`;
    winston.info(message);
    console.log(message);
});

module.exports = server
