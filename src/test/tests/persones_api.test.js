const { request, routes } = require('../lib');

const TEST_PERSONES_DATA = {
  name: 'TEST_USER',
  number: '123-456-789'
};

const UPDATE_PERSONES_DATA = {
  name: 'USER_UPDATE',
  number: '777-456-090'
};

describe('Persones suite', () => {
  let personeId;

  test('should get all persons', async () => {
    await request
      .get(routes.persons.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('should create a valid person successfully', async () => {
    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send(TEST_PERSONES_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        personeId = res.body.id;
        expect(res.body.date).toBeUndefined();
        expect(res.body).toMatchObject({
          name: TEST_PERSONES_DATA.name,
          number: TEST_PERSONES_DATA.number
        });
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send(TEST_PERSONES_DATA)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Person validation failed: name: Error, expected `name` to be unique. Value:'
        );
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Person validation failed: number: Path `number` is required., name: Path `name` is required.'
        );
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send({ name: 'TEST' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Person validation failed: number: Path `number` is required.'
        );
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send({ number: '123-456-789' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Person validation failed: name: Path `name` is required.'
        );
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send({
        name: 'TE',
        number: '123-456-789'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Person validation failed: name: Path `name`'
        );
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send({
        name: 'TEST',
        number: '123-456'
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Person validation failed: number: Path `number'
        );
      });
  });

  test('should get a person by id', async () => {
    await request
      .get(routes.persons.getById(personeId))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toMatchObject({
          name: TEST_PERSONES_DATA.name,
          number: TEST_PERSONES_DATA.number
        });
      });
  });

  test('should update person successfully', async () => {
    let secondPersoneId;

    await request
      .put(routes.persons.update(personeId))
      .set('Accept', 'application/json')
      .send(TEST_PERSONES_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toMatchObject({
          name: TEST_PERSONES_DATA.name,
          number: TEST_PERSONES_DATA.number
        });
      });

    await request
      .put(routes.persons.update(personeId))
      .set('Accept', 'application/json')
      .send(UPDATE_PERSONES_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toMatchObject({
          name: UPDATE_PERSONES_DATA.name,
          number: UPDATE_PERSONES_DATA.number
        });
      });

    await request
      .get(routes.persons.getById(personeId))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toMatchObject({
          name: UPDATE_PERSONES_DATA.name,
          number: UPDATE_PERSONES_DATA.number
        });
      });

    await request
      .post(routes.persons.create)
      .set('Accept', 'application/json')
      .send(TEST_PERSONES_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        secondPersoneId = res.body.id;
        expect(res.body.date).toBeUndefined();
        expect(res.body).toMatchObject({
          name: TEST_PERSONES_DATA.name,
          number: TEST_PERSONES_DATA.number
        });
      });

    await request
      .put(routes.persons.update(secondPersoneId))
      .set('Accept', 'application/json')
      .send(UPDATE_PERSONES_DATA)
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toContain(
          'Validation failed: name: Error, expected `name` to be unique. Value:'
        );
      });

    await request
      .delete(routes.persons.delete(secondPersoneId))
      .then(() => expect(204));

    await request.get(routes.persons.getById(secondPersoneId)).expect(404);
  });

  test('should delete person successfully', async () => {
    await request
      .delete(routes.persons.delete(personeId))
      .then(() => expect(204));

    await request.get(routes.persons.getById(personeId)).expect(404);
  });
});
