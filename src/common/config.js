const { config } = require('dotenv');
const path = require('path');

config({
  path: path.join(__dirname, '../../.env')
});

const MONGODB_URI =
  process.env.NODE_ENV === 'development'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
