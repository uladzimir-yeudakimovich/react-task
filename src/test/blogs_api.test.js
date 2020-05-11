// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const port = process.env.PORT || 'localhost:4000';

const api = supertest(port);
const TEST_BLOG_DATA = {
  title: 'test',
  author: 'test',
  url: 'http://blog.test.com/',
  likes: 1
};

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('add blog', async () => {
  await api
    .post('/api/blogs')
    .set('Accept', 'application/json')
    .send(TEST_BLOG_DATA)
    .expect(200)
    .expect('Content-Type', /json/)
    .then(res => {
      expect(res.body).toMatchObject({
        title: TEST_BLOG_DATA.title,
        url: TEST_BLOG_DATA.url
      });
    });
});
