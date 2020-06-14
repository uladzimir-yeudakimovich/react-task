const { request: unAuthReq, routes } = require('../lib');
const authReq = require('../utils/auth-req');

const TEST_USER_DATA = {
  name: 'TEST_USER_NAME',
  login: 'TEST_USER_LOGIN',
  password: '123456'
};

const UPDATE_USER_DATA = {
  name: 'UPDATE_USER_NAME',
  login: 'UPDATE_USER_LOGIN',
  password: '135246'
};

describe('Users suite', () => {
  let request = unAuthReq;
  let userId;

  beforeAll(async () => {
    request = await authReq(unAuthReq);
  });

  test('should get all users', async () => {
    await request
      .get(routes.users.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  describe('should create a valid user successfully', () => {
    it('should get 200 and create new user ', async () => {
      await request
        .post(routes.users.create)
        .set('Accept', 'application/json')
        .send(TEST_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          userId = res.body.id;
          expect(res.body.password).toBeUndefined();
          expect(res.body).toMatchObject({
            name: TEST_USER_DATA.name,
            login: TEST_USER_DATA.login
          });
        });
    });

    it('should get validation failed login ', async () => {
      await request
        .post(routes.users.create)
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
        .post(routes.users.create)
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
        .post(routes.users.create)
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
        .post(routes.users.create)
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
        .post(routes.users.create)
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
        .post(routes.users.create)
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

  test('should get a user by id', async () => {
    await request
      .get(routes.users.getById(userId))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.password).toBeUndefined();
        expect(res.body).toMatchObject({
          name: TEST_USER_DATA.name,
          login: TEST_USER_DATA.login
        });
      });
  });

  describe('should update user successfully', () => {
    let secondUserId;

    it('should get 200 ', async () => {
      await request
        .put(routes.users.update(userId))
        .set('Accept', 'application/json')
        .send(TEST_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.password).toBeUndefined();
          expect(res.body).toMatchObject({
            name: TEST_USER_DATA.name,
            login: TEST_USER_DATA.login
          });
        });
    });

    it('should get 200 and update user data ', async () => {
      await request
        .put(routes.users.update(userId))
        .set('Accept', 'application/json')
        .send(UPDATE_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.password).toBeUndefined();
          expect(res.body).toMatchObject({
            name: UPDATE_USER_DATA.name,
            login: UPDATE_USER_DATA.login
          });
        });
    });

    it('should get 200 and get user with new data ', async () => {
      await request
        .get(routes.users.getById(userId))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.password).toBeUndefined();
          expect(res.body).toMatchObject({
            name: UPDATE_USER_DATA.name,
            login: UPDATE_USER_DATA.login
          });
        });
    });

    it('should get 200 and create new user ', async () => {
      await request
        .post(routes.users.create)
        .set('Accept', 'application/json')
        .send(TEST_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          secondUserId = res.body.id;
          expect(res.body.password).toBeUndefined();
          expect(res.body).toMatchObject({
            name: TEST_USER_DATA.name,
            login: TEST_USER_DATA.login
          });
        });
    });

    it('should get validation error ', async () => {
      await request
        .put(routes.users.update(secondUserId))
        .set('Accept', 'application/json')
        .send(UPDATE_USER_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Validation failed: login: Error, expected `login` to be unique.'
          );
        });
    });

    it('should get 204 and delete second user ', async () => {
      await request
        .delete(routes.users.delete(secondUserId))
        .then(() => expect(204));
    });

    it('should get 404 becouse user has been deleted ', async () => {
      await request.get(routes.users.getById(secondUserId)).expect(404);
    });
  });

  test('should delete user successfully', async () => {
    await request.delete(routes.users.delete(userId)).then(() => expect(204));
    await request.get(routes.users.getById(userId)).expect(404);
  });
});
