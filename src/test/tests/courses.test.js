const { request: unAuthReq, routes } = require('../lib');
const authReq = require('../utils/auth-req');

const TEST_COURSES_DATA = {
  name: 'Autotest course',
  parts: [
    { name: 'React', exercises: 12 },
    { name: 'Angular', exercises: 7 }
  ]
};

describe('Courses suite auth', () => {
  let request = unAuthReq;
  let courseId;

  beforeAll(async () => {
    request = await authReq(unAuthReq);
  });

  test('should get all courses', async () => {
    await request
      .get(routes.courses.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('should create course successfully', async () => {
    await request
      .post(routes.courses.create)
      .set('Accept', 'application/json')
      .send(TEST_COURSES_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        courseId = res.body.id;
        expect(res.body).toMatchObject(TEST_COURSES_DATA);
      });
  });

  test('should delete course successfully', async () => {
    await request
      .delete(routes.courses.delete(courseId))
      .then(() => expect(204));
  });
});
