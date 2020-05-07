const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('params', req => JSON.stringify(req.params));

const loggerFormat = `{
  url: ':url', method: ':method', status: :status, time: :response-time ms,
  body: :body, params: :params,
  timestamp: :date[web]
}`;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../../logs/access.log'),
  { flags: 'a' }
);

const showRequestLogger = morgan(loggerFormat);
const saveRequestLogger = morgan(loggerFormat, { stream: accessLogStream });

module.exports = { showRequestLogger, saveRequestLogger };
