const personsService = require('../persons/persons.service');

const getData = async () => {
  const persons = await personsService.getAll();
  return persons.length;
};

module.exports = { getData };
