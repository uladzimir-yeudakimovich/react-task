const { sign } = require('jsonwebtoken');

const User = require('../../models/user.model');
const { JWT_SECRET_KEY } = require('../../common/config.js');

const addUser = async user => User.create(user);
const getToken = async (id, login) =>
  sign({ id, login }, JWT_SECRET_KEY, { expiresIn: '30m' });

module.exports = { addUser, getToken };
