const { request, routes } = require('../lib');

const TEST_BLOG_DATA = {
  title: 'test',
  author: 'test',
  url: 'http://blog.test.com/',
  likes: 1
};

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
      expect(res.body).toMatchObject({
        title: TEST_BLOG_DATA.title,
        author: TEST_BLOG_DATA.author,
        url: TEST_BLOG_DATA.url,
        likes: TEST_BLOG_DATA.likes
      });
    });
});
