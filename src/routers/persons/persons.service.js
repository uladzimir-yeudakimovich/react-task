const usersRepo = require('./persons.controller');

const getAll = () => usersRepo.getAll();
const getUser = id => usersRepo.getUser(id);
const addUser = user => usersRepo.addUser(user);
const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, addUser, deleteUser };
