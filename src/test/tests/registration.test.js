const { request: unAuthReq, routes } = require('../lib');
const authReq = require('../utils/auth-req');

const TEST_USER_DATA = {
  login: 'TEST_LOGIN',
  name: 'TEST_NAME',
  password: 'TEST_PASSWORD'
};

describe('Registration suite', () => {
  let request = unAuthReq;
  let userId;

  describe('should register a valid user successfully', () => {
    it('should get 200 and register a new user ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send(TEST_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          userId = res.body.user.id;
          expect(res.body.message).toContain('Successful registration.');
          expect(res.body.token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV');
          expect(res.body.user.password).toBeUndefined();
          expect(res.body.user).toMatchObject({
            name: TEST_USER_DATA.name,
            login: TEST_USER_DATA.login
          });
        });
    });

    it('should get validation failed login ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send(TEST_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'User validation failed: login: Error, expected `login` to be unique.'
          );
        });
    });

    it('should get validation failed password ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send({})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'User validation failed: password: Path `password` is required., login: Path `login` is required.'
          );
        });
    });

    it('should get validation failed password ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send({ login: 'TEST' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'User validation failed: password: Path `password` is required.'
          );
        });
    });

    it('should get validation failed login ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send({ password: '337755' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'User validation failed: login: Path `login` is required.'
          );
        });
    });

    it('should get validation failed login length ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send({
          login: 'TE',
          password: '135244'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'User validation failed: login: Path `login`'
          );
        });
    });

    it('should get validation failed password length ', async () => {
      await request
        .post(routes.registration)
        .set('Accept', 'application/json')
        .send({
          login: 'NEW_TEST_LOGIN',
          password: '1230'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'User validation failed: password: Path `password`'
          );
        });
    });
  });

  test('should delete user successfully', async () => {
    request = await authReq(unAuthReq);
    await request.delete(routes.users.delete(userId)).then(() => expect(204));
    await request.get(routes.users.getById(userId)).expect(404);
  });
});
