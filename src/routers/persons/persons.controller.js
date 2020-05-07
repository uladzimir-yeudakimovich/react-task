let persons = require('../../db/db');
const User = require('../../models/user.model');

const getAll = async () => persons;

const getUser = async id => persons.find(el => el.id === id);

const addUser = async user => {
  const chechUser = persons.find(el => el.name === user.name);
  if (chechUser) return;
  const newPerson = new User(user);
  persons.push(newPerson);
  return newPerson;
};

const deleteUser = async id => {
  persons = persons.filter(el => el.id !== id);
};

module.exports = { getAll, getUser, addUser, deleteUser };
