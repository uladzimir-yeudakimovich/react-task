const { request: unAuthReq, routes } = require('../lib');
const authReq = require('../utils/auth-req');

const TEST_PERSONES_DATA = {
  name: 'TEST_USER',
  number: '123-456-789'
};

const UPDATE_PERSONES_DATA = {
  name: 'USER_UPDATE',
  number: '777-456-090'
};

describe('Persones suite', () => {
  let request = unAuthReq;
  let personeId;

  beforeAll(async () => {
    request = await authReq(unAuthReq);
  });

  test('should get all persons', async () => {
    await request
      .get(routes.persons.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  describe('should create a valid person successfully', () => {
    it('should get 200 and create new persone ', async () => {
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
    });

    it('should get validation failed name ', async () => {
      await request
        .post(routes.persons.create)
        .set('Accept', 'application/json')
        .send(TEST_PERSONES_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Person validation failed: name: Error, expected `name` to be unique. Value:'
          );
        });
    });

    it('should get validation failed number ', async () => {
      await request
        .post(routes.persons.create)
        .set('Accept', 'application/json')
        .send({})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Person validation failed: number: Path `number` is required., name: Path `name` is required.'
          );
        });
    });

    it('should get validation failed number ', async () => {
      await request
        .post(routes.persons.create)
        .set('Accept', 'application/json')
        .send({ name: 'TEST' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Person validation failed: number: Path `number` is required.'
          );
        });
    });

    it('should get validation failed name ', async () => {
      await request
        .post(routes.persons.create)
        .set('Accept', 'application/json')
        .send({ number: '123-456-789' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Person validation failed: name: Path `name` is required.'
          );
        });
    });

    it('should get validation failed name length ', async () => {
      await request
        .post(routes.persons.create)
        .set('Accept', 'application/json')
        .send({
          name: 'TE',
          number: '123-456-789'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Person validation failed: name: Path `name`'
          );
        });
    });

    it('should get validation failed number length ', async () => {
      await request
        .post(routes.persons.create)
        .set('Accept', 'application/json')
        .send({
          name: 'TEST',
          number: '123-456'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Person validation failed: number: Path `number'
          );
        });
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

  describe('should update person successfully', () => {
    let secondPersoneId;

    it('should get 200 ', async () => {
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
    });

    it('should get 200 and update persone data ', async () => {
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
    });

    it('should get 200 and get persone with new data ', async () => {
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
    });

    it('should get 200 and create new persone ', async () => {
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
    });

    it('should get validation error ', async () => {
      await request
        .put(routes.persons.update(secondPersoneId))
        .set('Accept', 'application/json')
        .send(UPDATE_PERSONES_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.error).toContain(
            'Validation failed: name: Error, expected `name` to be unique. Value:'
          );
        });
    });

    it('should get 204 and delete second persone ', async () => {
      await request
        .delete(routes.persons.delete(secondPersoneId))
        .then(() => expect(204));
    });

    it('should get 404 becouse persone has been deleted ', async () => {
      await request.get(routes.persons.getById(secondPersoneId)).expect(404);
    });
  });

  test('should delete person successfully', async () => {
    await request
      .delete(routes.persons.delete(personeId))
      .then(() => expect(204));

    await request.get(routes.persons.getById(personeId)).expect(404);
  });
});
