const personsRepo = require('./persons.controller');

const getAll = () => personsRepo.getAll();
const getPerson = id => personsRepo.getPerson(id);
const addPerson = person => personsRepo.addPerson(person);
const editPerson = (id, person) => personsRepo.updatePerson(id, person);
const deletePerson = id => personsRepo.deletePerson(id);

module.exports = { getAll, getPerson, addPerson, editPerson, deletePerson };
