const express = require('express');

const { showRequestLogger, saveRequestLogger } = require('./middleware/logger');
const infoRouter = require('./routers/info/info.router');
const personsRouter = require('./routers/persons/persons.router');
const unknownEndpoint = require('./middleware/unknown-endpoint');

const app = express();

app.use(express.json());
app.use(showRequestLogger);
app.use(saveRequestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send('Service is running!');
  next();
});

app.use('/info', infoRouter);
app.use('/api/persons', personsRouter);
app.use(unknownEndpoint);

module.exports = app;
