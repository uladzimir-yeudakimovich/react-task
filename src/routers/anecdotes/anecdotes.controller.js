const Anecdote = require('../../models/anecdote');

const getAll = async () => Anecdote.find({});
const getAnecdote = async id => Anecdote.findById(id);
const addAnecdote = async anecdote => Anecdote.create(anecdote);
const updateAnecdote = async (id, anecdote) => {
  await Anecdote.findByIdAndUpdate(id, anecdote, {
    runValidators: true,
    context: 'query'
  });
  return Anecdote.findById(id);
};
const deleteAnecdote = async id => Anecdote.findByIdAndDelete(id);

module.exports = {
  getAll,
  getAnecdote,
  addAnecdote,
  updateAnecdote,
  deleteAnecdote
};
