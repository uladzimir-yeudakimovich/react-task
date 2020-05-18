const { request, routes } = require('../lib');

const TEST_BLOG_DATA = {
  title: 'Autotest blog',
  author: 'Uladzimir Yeudakimovich',
  url: 'https://uladzimir-yeudakimovich.github.io/',
  likes: 100
};

describe('Blogs suite unauth', () => {
  describe('GET all blogs', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.blogs.getAll).expect(401);
    });
  });

  describe('GET blog by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.blogs.getById('123')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.blogs.create)
        .send(TEST_BLOG_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.blogs.update('12345'))
        .send(TEST_BLOG_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.blogs.delete('12345')).expect(401);
    });
  });
});
