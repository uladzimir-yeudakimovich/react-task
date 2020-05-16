const { verify } = require('jsonwebtoken');

const { JWT_SECRET_KEY } = require('../common/config.js');

const checkToken = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  if (token.startsWith('Bearer ')) token = await token.slice(7, token.length);
  verify(token, JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = checkToken;
