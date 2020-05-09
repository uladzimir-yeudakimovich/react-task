const Person = require('../../models/person.model');

const getAll = async () => Person.find({});
const getPerson = async id => Person.findById(id);
const addPerson = async person => Person.create(person);
const updatePerson = async (id, person) => {
  await Person.findByIdAndUpdate(id, person, {
    runValidators: true,
    context: 'query'
  });
  return Person.findById(id);
};
const deletePerson = async id => Person.findByIdAndDelete(id);

module.exports = { getAll, getPerson, addPerson, updatePerson, deletePerson };
