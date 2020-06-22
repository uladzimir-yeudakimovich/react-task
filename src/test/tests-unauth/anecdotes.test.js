const { request, routes } = require('../lib');

const TEST_ANECDOTES_DATA = {
  text: 'TEST_TEXT',
  votes: 5
};

describe('Anecdotes suite unauth', () => {
  describe('GET all anecdotes', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.anecdotes.getAll).expect(401);
    });
  });

  describe('GET anecdotes by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.anecdotes.getById('123')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.anecdotes.create)
        .send(TEST_ANECDOTES_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.anecdotes.update('12345'))
        .send(TEST_ANECDOTES_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.anecdotes.delete('12345')).expect(401);
    });
  });
});
