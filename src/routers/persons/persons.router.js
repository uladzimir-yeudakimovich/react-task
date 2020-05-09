const router = require('express').Router();

const personsService = require('./persons.service');
const Person = require('../../models/person.model');

router.route('/').get(async (req, res, next) => {
  await personsService
    .getAll()
    .then(result => {
      res.json(result.map(Person.toResponse));
    })
    .catch(error => next(error));
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await personsService
    .getPerson(id)
    .then(result => {
      if (result) {
        res.json(Person.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  await personsService
    .addPerson(body)
    .then(result => {
      res.json(Person.toResponse(result));
    })
    .catch(error => next(error));
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await personsService
    .editPerson(id, body)
    .then(result => {
      res.json(Person.toResponse(result));
    })
    .catch(error => next(error));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await personsService
    .deletePerson(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = router;
