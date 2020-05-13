const { request, routes } = require('../lib');

const TEST_PERSONES_DATA = {
  name: 'TEST_USER',
  number: '123-456-789'
};

let personeId;

test('should get all persons', async () => {
  await request
    .get(routes.persons.getAll)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('should create person successfully', async () => {
  await request
    .post(routes.persons.create)
    .set('Accept', 'application/json')
    .send(TEST_PERSONES_DATA)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      personeId = res.body.id;
      expect(res.body).toMatchObject({
        name: TEST_PERSONES_DATA.name,
        number: TEST_PERSONES_DATA.number
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

test('should delete person successfully', async () => {
  await request
    .delete(routes.persons.delete(personeId))
    .then(() => expect(204));

  await request.get(routes.persons.getById(personeId)).expect(404);
});
