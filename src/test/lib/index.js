// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const routes = require('./routes');
const host = process.env.HOST || 'localhost:4000';
const request = supertest(host);

module.exports = {
  request,
  routes
};
