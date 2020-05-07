const router = require('express').Router();

const personsService = require('./persons.service');

router.route('/').get(async (req, res) => {
  const persons = await personsService.getAll();
  res.json(persons);
});

router.route('/:id').get(async (req, res) => {
  const id = Number(req.params.id);
  const person = await personsService.getUser(id);
  if (person) {
    res.json(person);
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
  res.json(person);
});

router.route('/:id').delete(async (req, res) => {
  const id = Number(req.params.id);
  await personsService.deleteUser(id);
  res.status(204).end();
});

module.exports = router;
