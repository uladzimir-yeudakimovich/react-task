const router = require('express').Router();

const usersService = require('./user.service');
const User = require('../../models/user.model');

router.route('/').get(async (req, res, next) => {
  await usersService
    .getAll()
    .then(result => {
      res.json(result.map(User.toResponse));
    })
    .catch(error => next(error));
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await usersService
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
  await usersService
    .addUser(body)
    .then(result => {
      res.json(User.toResponse(result));
    })
    .catch(error => next(error));
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await usersService
    .editUser(id, body)
    .then(result => {
      if (result) {
        res.json(User.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await usersService
    .deleteUser(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = router;
