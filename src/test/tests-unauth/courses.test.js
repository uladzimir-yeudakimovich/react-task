const { request, routes } = require('../lib');

const TEST_COURSES_DATA = {
  name: 'Autotest course',
  parts: [
    { name: 'React', exercises: 12 },
    { name: 'Angular', exercises: 7 }
  ]
};

describe('Courses suite unauth', () => {
  describe('GET all courses', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.courses.getAll).expect(401);
    });
  });

  describe('GET blog by id', () => {
    it('should get 401 without token presented ', async () => {
      await request.get(routes.courses.getById('123')).expect(401);
    });
  });

  describe('POST', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .post(routes.courses.create)
        .send(TEST_COURSES_DATA)
        .expect(401);
    });
  });

  describe('PUT', () => {
    it('should get 401 without token presented ', async () => {
      await request
        .put(routes.courses.update('12345'))
        .send(TEST_COURSES_DATA)
        .expect(401);
    });
  });

  describe('DELETE', () => {
    it('should get 401 without token presented ', async () => {
      await request.delete(routes.courses.delete('12345')).expect(401);
    });
  });
});
