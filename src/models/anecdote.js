const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const anecdoteSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    text: String,
    votes: Number
  },
  { versionKey: false }
);

anecdoteSchema.statics.toResponse = anecdote => {
  const { id, text, votes } = anecdote;
  return { id, text, votes };
};

const Anecdote = model('Anecdote', anecdoteSchema);

module.exports = Anecdote;
