const router = require('express').Router();

const loginService = require('./login.service');
const User = require('../../models/user.model');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const result = await loginService.loginUser(login, password);
  if (result) {
    res.status(200).send({
      message: 'Successful login.',
      token: result.token,
      user: User.toResponse(result.user)
    });
  } else {
    res.status(401).json({ error: 'invalid username or password' });
  }
});

module.exports = router;
