// test/setup.js
const dotenv = require('dotenv');
const path = require('path');

// Load the correct .env file based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
dotenv.config({ path: path.resolve(__dirname, `../.env.${env}`) });

// Now require the main application entry point
require('../index');  // or the main entry point of your app