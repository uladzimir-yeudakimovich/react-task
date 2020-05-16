const router = require('express').Router();

const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  const token = await loginService.loginUser(login, password);
  if (token) {
    res.status(200).send({ message: 'Successful login.', token });
  } else {
    res.status(401).json({ error: 'invalid username or password' });
  }
});

module.exports = router;
