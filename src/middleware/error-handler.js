const { showErrorLogger } = require('./logger');

const errorHandler = (err, req, res, next) => {
  showErrorLogger(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({
      name: 'Validation failed',
      status: res.statusCode,
      message: err.message
    });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  res.status(500).send('Server error');
  next(err);
};

module.exports = errorHandler;
