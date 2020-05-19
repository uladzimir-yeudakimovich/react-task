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
  let userId;

  beforeAll(async () => {
    request = await authReq(unAuthReq);
  });

  test('should get all blogs', async () => {
    await request
      .get(routes.blogs.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  describe('should create blog successfully', () => {
    it('should get 200 and create new blog ', async () => {
      await request
        .post(routes.blogs.create)
        .set('Accept', 'application/json')
        .send(TEST_BLOG_DATA)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          blogId = res.body.id;
          userId = res.body.user.id;
          expect(res.body.user.login).toContain('admin');
          expect(res.body).toMatchObject(TEST_BLOG_DATA);
        });
    });

    it('should get a user by id with test blog in blogs', async () => {
      await request
        .get(routes.users.getById(userId))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.password).toBeUndefined();
          expect(res.body.login).toContain('admin');
          // console.log(res.body);
          // expect(res.body.blogs[0]).toMatchObject({
          //   title: TEST_BLOG_DATA.title,
          //   author: TEST_BLOG_DATA.author,
          //   url: TEST_BLOG_DATA.url,
          //   likes: TEST_BLOG_DATA.likes.toString()
          // });
        });
    });
  });

  describe('should delete blogs successfully', () => {
    it('should delete blog', async () => {
      await request.delete(routes.blogs.delete(blogId)).then(() => expect(204));
    });

    it('should get a user by id without blog in blogs', async () => {
      await request
        .get(routes.users.getById(userId))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body.password).toBeUndefined();
          expect(res.body.login).toContain('admin');
          expect(res.body.blogs).toHaveLength(0);
        });
    });
  });
});
