const loginRepo = require('./login.controller');

const loginUser = (login, password) => loginRepo.loginUser(login, password);

module.exports = { loginUser };
