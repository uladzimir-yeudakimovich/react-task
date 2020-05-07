const express = require('express');

const infoRouter = require('./routers/info/info.router');
const personsRouter = require('./routers/persons/persons.router');

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send('Service is running!');
  next();
});

app.use('/info', infoRouter);
app.use('/api/persons', personsRouter);

module.exports = app;
