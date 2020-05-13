const express = require('express');
const app = express();
const cors = require('cors');

const { showRequestLogger, saveRequestLogger } = require('./middleware/logger');
const infoRouter = require('./routers/info/info.router');
const anecdotesRouter = require('./routers/anecdotes/anecdotes.router');
const blogsRouter = require('./routers/blogs/blog.router');
const coursesRouter = require('./routers/courses/courses.router');
const personsRouter = require('./routers/persons/persons.router');
const unknownEndpoint = require('./middleware/unknown-endpoint');
const errorHandler = require('./middleware/error-handler');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(showRequestLogger);
app.use(saveRequestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send('Service is running!');
  next();
});

app.use('/info', infoRouter);
app.use('/api/anecdotes', anecdotesRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/persons', personsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
