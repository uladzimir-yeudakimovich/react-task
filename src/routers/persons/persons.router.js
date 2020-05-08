const router = require('express').Router();

const personsService = require('./persons.service');
const User = require('../../models/user.model');

router.route('/').get(async (req, res) => {
  const persons = await personsService.getAll();
  res.json(persons.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = Number(req.params.id);
  const person = await personsService.getUser(id);
  if (person) {
    res.json(User.toResponse(person));
  } else {
    res.status(404).end();
  }
});

router.route('/').post(async (req, res) => {
  const { body } = req;
  const { name, number } = body;
  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = await personsService.addUser(body);
  if (person) {
    res.json(User.toResponse(person));
  } else {
    res
      .status(409)
      .send({ error: 'name must be unique' })
      .end();
  }
});

router.route('/:id').put(async (req, res) => {
  const { body } = req;
  const { name, number } = body;
  if (!name || !number) {
    return res.status(400).json({ error: 'content missing' });
  }
  const person = await personsService.editUser(body);
  if (person) {
    res.json(User.toResponse(person));
  } else {
    res
      .status(409)
      .send({ error: 'name must be unique' })
      .end();
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = Number(req.params.id);
  await personsService.deleteUser(id);
  res.status(204).end();
});

module.exports = router;
