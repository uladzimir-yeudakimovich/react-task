const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

morgan.token('body', req => JSON.stringify(req.body));
morgan.token('params', req => JSON.stringify(req.params));

const infoFormat = `{
  url: ':url', method: ':method', status: :status, time: :response-time ms,
  body: :body, params: :params,
  timestamp: :date[web]
}`;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../../logs/access.log'),
  { flags: 'a' }
);

const showRequestLogger = morgan(infoFormat);
const saveRequestLogger = morgan(infoFormat, { stream: accessLogStream });
const showErrorLogger = async message => console.error({ error: message });

module.exports = { showRequestLogger, saveRequestLogger, showErrorLogger };
