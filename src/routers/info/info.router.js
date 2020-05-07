const router = require('express').Router();

const infoService = require('./info.service');

router.route('/').get(async (req, res) => {
  const info = await infoService.getData();
  res.json(`Phonebook has info for ${info} people ${new Date()}`);
});

module.exports = router;
