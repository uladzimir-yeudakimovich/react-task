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

const updateUser = async user => {
  const index = persons.findIndex(el => el.name === user.name);
  if (index < 0) return;
  persons[index].number = user.number;
  return persons[index];
};

const deleteUser = async id => {
  persons = persons.filter(el => el.id !== id);
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
