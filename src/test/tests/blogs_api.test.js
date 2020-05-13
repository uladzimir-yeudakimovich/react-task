const { request, routes } = require('../lib');

const TEST_BLOG_DATA = {
  title: 'Autotest blog',
  author: 'Uladzimir Yeudakimovich',
  url: 'https://uladzimir-yeudakimovich.github.io/',
  likes: 100
};

let blogId;

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
