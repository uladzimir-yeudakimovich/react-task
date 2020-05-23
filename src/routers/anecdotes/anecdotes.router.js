const router = require('express').Router();

const anecdoteService = require('./anecdotes.service');
const Anecdote = require('../../models/anecdote');

router.route('/').get(async (req, res, next) => {
  await anecdoteService
    .getAll()
    .then(result => {
      res.json(result.map(Anecdote.toResponse));
    })
    .catch(error => next(error));
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await anecdoteService
    .getAnecdote(id)
    .then(result => {
      if (result) {
        res.json(Anecdote.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  await anecdoteService
    .addAnecdote(body)
    .then(result => {
      res.json(Anecdote.toResponse(result));
    })
    .catch(error => next(error));
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await anecdoteService
    .editAnecdote(id, body)
    .then(result => {
      if (result) {
        res.json(Anecdote.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await anecdoteService
    .deleteAnecdote(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = router;
