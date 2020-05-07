const express = require('express');

const personsRouter = require('./routers/persons/persons.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send('Service is running!');
  next();
});

app.use('/api/persons', personsRouter);

module.exports = app;
