const registrationRepo = require('./registration.controller');

const registrationUser = user => registrationRepo.addUser(user);
const getToken = (id, login) => registrationRepo.getToken(id, login);

module.exports = { registrationUser, getToken };
