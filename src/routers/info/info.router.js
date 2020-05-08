const router = require('express').Router();

const infoService = require('./info.service');

router.route('/').get(async (req, res) => {
  const count = await infoService.getData();
  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  `);
});

module.exports = router;
