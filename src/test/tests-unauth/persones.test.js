const { request, routes } = require('../lib');

const TEST_PERSONES_DATA = {
  name: 'TEST_USER',
  number: '123-456-789'
};

describe('Persons suite unauth', () => {
  describe('GET all persons', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.persons.getAll).expect(401);
    });
  });

  describe('GET blog by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.persons.getById('123')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.persons.create)
        .send(TEST_PERSONES_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.persons.update('12345'))
        .send(TEST_PERSONES_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.persons.delete('12345')).expect(401);
    });
  });
});
