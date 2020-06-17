const { request, routes } = require('../lib');

const TEST_USER_DATA = {
  login: 'admin',
  password: 'admin'
};

describe('Login suite', () => {
  test('should get token after login', async () => {
    await request
      .post(routes.login)
      .set('Accept', 'application/json')
      .send(TEST_USER_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.message).toContain('Successful login.');
        expect(res.body.token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV');
        expect(res.body.user.password).toBeUndefined();
        expect(res.body.user).toMatchObject({
          login: TEST_USER_DATA.login
        });
      });
  });

  test('should get error after login', async () => {
    await request
      .post(routes.login)
      .set('Accept', 'application/json')
      .send({})
      .expect(401)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.token).toBeUndefined();
        expect(res.body.error).toContain('invalid username or password');
      });
  });
});
