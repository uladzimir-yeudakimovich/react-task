const router = require('express').Router();

const infoService = require('./info.service');

router.route('/').get(async (req, res) => {
  const info = await infoService.getData();
  res.send(`
    <p>Phonebook has info for ${info} people</p>
    <p>${new Date()}</p>
  `);
});

module.exports = router;
