const { request, routes } = require('../lib');

const TEST_USER_DATA = {
  login: 'admin',
  password: 'admin'
};

test('should get token after login', async () => {
  await request
    .post(routes.login)
    .set('Accept', 'application/json')
    .send(TEST_USER_DATA)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body.message).toContain('Successful login.');
    });
});
