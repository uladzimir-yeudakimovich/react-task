const anecdoteRepo = require('./anecdotes.controller');

const getAll = () => anecdoteRepo.getAll();
const getAnecdote = id => anecdoteRepo.getAnecdote(id);
const addAnecdote = anecdote => anecdoteRepo.addAnecdote(anecdote);
const editAnecdote = (id, anecdot) => anecdoteRepo.updateAnecdote(id, anecdot);
const deleteAnecdote = id => anecdoteRepo.deleteAnecdote(id);

module.exports = {
  getAll,
  getAnecdote,
  addAnecdote,
  editAnecdote,
  deleteAnecdote
};
