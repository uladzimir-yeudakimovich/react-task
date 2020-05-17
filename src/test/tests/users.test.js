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

  test('should create a valid user successfully', async () => {
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

    await request
      .post(routes.users.create)
      .set('Accept', 'application/json')
      .send(TEST_USER_DATA)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'User validation failed: login: Error, expected `login` to be unique.'
        );
      });

    await request
      .post(routes.users.create)
      .set('Accept', 'application/json')
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'User validation failed: password: Path `password` is required., login: Path `login` is required.'
        );
      });

    await request
      .post(routes.users.create)
      .set('Accept', 'application/json')
      .send({ login: 'TEST' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'User validation failed: password: Path `password` is required.'
        );
      });

    await request
      .post(routes.users.create)
      .set('Accept', 'application/json')
      .send({ password: '337755' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'User validation failed: login: Path `login` is required.'
        );
      });

    await request
      .post(routes.users.create)
      .set('Accept', 'application/json')
      .send({
        login: 'TE',
        password: '135244'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'User validation failed: login: Path `login`'
        );
      });

    await request
      .post(routes.users.create)
      .set('Accept', 'application/json')
      .send({
        login: 'NEW_TEST_LOGIN',
        password: '12300'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'User validation failed: password: Path `password`'
        );
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

  test('should update user successfully', async () => {
    let secondUserId;

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

    await request
      .put(routes.users.update(secondUserId))
      .set('Accept', 'application/json')
      .send(UPDATE_USER_DATA)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Validation failed: login: Error, expected `login` to be unique.'
        );
      });

    await request
      .delete(routes.users.delete(secondUserId))
      .then(() => expect(204));

    await request.get(routes.users.getById(secondUserId)).expect(404);
  });

  test('should delete user successfully', async () => {
    await request.delete(routes.users.delete(userId)).then(() => expect(204));
    await request.get(routes.users.getById(userId)).expect(404);
  });
});
