const { request, routes } = require('../lib');

test('should get info', async () => {
  await request
    .get(routes.info)
    .expect(200)
    .expect('Content-Type', 'text/html; charset=utf-8');
});
