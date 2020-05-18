const { request: unAuthReq, routes } = require('../lib');
const authReq = require('../utils/auth-req');

const TEST_BLOG_DATA = {
  title: 'Autotest blog',
  author: 'Uladzimir Yeudakimovich',
  url: 'https://uladzimir-yeudakimovich.github.io/',
  likes: 100
};

describe('Blogs suite auth', () => {
  let request = unAuthReq;
  let blogId;

  beforeAll(async () => {
    request = await authReq(unAuthReq);
  });

  test('should get all blogs', async () => {
    await request
      .get(routes.blogs.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('should create blog successfully', async () => {
    await request
      .post(routes.blogs.create)
      .set('Accept', 'application/json')
      .send(TEST_BLOG_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        blogId = res.body.id;
        expect(res.body).toMatchObject(TEST_BLOG_DATA);
      });
  });

  test('should delete blogs successfully', async () => {
    await request.delete(routes.blogs.delete(blogId)).then(() => expect(204));
  });
});
