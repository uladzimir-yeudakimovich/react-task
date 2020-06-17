const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');

const User = require('../../models/user.model');
const { JWT_SECRET_KEY } = require('../../common/config.js');

const loginUser = async (login, password) => {
  const user = await User.findOne({ login });
  const passwordCorrect =
    user === null ? false : await compare(password, user.password);
  if (!(user && passwordCorrect)) {
    return;
  }
  const { id } = user;
  const userForToken = { id, login };
  return {
    user,
    token: sign(userForToken, JWT_SECRET_KEY, { expiresIn: '30m' })
  };
};

module.exports = { loginUser };
