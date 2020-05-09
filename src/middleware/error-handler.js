const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).send('Server error');
  next(err);
};

module.exports = errorHandler;
