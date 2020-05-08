const router = require('express').Router();

const personsService = require('./persons.service');
const User = require('../../models/user.model');

router.route('/').get(async (req, res, next) => {
  await personsService
    .getAll()
    .then(result => {
      res.json(result.map(User.toResponse));
    })
    .catch(error => next(error));
});

router.route('/:id').get(async (req, res, next) => {
  const id = Number(req.params.id);
  await personsService
    .getUser(id)
    .then(result => {
      if (result) {
        res.json(User.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  const { name, number } = body;
  if (!name || !number) {
    return res.status(400).send({ error: 'content missing' });
  }
  await personsService
    .addUser(body)
    .then(result => {
      if (result) {
        res.json(User.toResponse(result));
      } else {
        res
          .status(409)
          .send({ error: 'name must be unique' })
          .end();
      }
    })
    .catch(error => next(error));
});

router.route('/:id').put(async (req, res, next) => {
  const id = Number(req.params.id);
  const { body } = req;
  const { name, number } = body;
  if (!name || !number) {
    return res.status(400).send({ error: 'content missing' });
  }
  await personsService
    .editUser(id, body)
    .then(result => {
      if (result) {
        res.json(User.toResponse(result));
      } else {
        res
          .status(409)
          .send({ error: 'name must be unique' })
          .end();
      }
    })
    .catch(error => next(error));
});

router.route('/:id').delete(async (req, res, next) => {
  const id = Number(req.params.id);
  await personsService
    .deleteUser(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = router;
