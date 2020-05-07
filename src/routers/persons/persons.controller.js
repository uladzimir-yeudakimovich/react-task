let persons = [
  {
    name: 'Arto Hellas',
    number: '123-123-123',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  },
  {
    name: 'Jon Black',
    number: '09-242-242-242',
    id: 5
  }
];

const getAll = async () => persons;

const getUser = async id => persons.find(el => el.id === id);

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0;
  return maxId + 1;
};

const addUser = async user => {
  const person = {
    name: user.name,
    number: user.number,
    id: generateId()
  };
  persons.push(person);
  return person;
};

const deleteUser = async id => {
  persons = persons.filter(el => el.id !== id);
};

module.exports = { getAll, getUser, addUser, deleteUser };
