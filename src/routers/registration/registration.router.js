const router = require('express').Router();

const registrationService = require('./registration.service');
const User = require('../../models/user.model');

router.route('/').post(async (req, res, next) => {
  await registrationService
    .registrationUser(req.body)
    .then(async result => {
      const user = User.toResponse(result);
      const token = await registrationService.getToken(user.id, user.login);
      res
        .status(200)
        .send({ message: 'Successful registration.', token, user });
    })
    .catch(error => next(error));
});

module.exports = router;
