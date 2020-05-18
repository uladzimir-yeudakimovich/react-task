const { request, routes } = require('../lib');

const TEST_ANECDOTES_DATA = {
  text: 'TEST_TEXT',
  votes: 5
};

describe('Anecdotes suite auth', () => {
  let anecdoteId;

  test('should get all anecdotes', async () => {
    await request
      .get(routes.anecdotes.getAll)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('should create anecdote successfully', async () => {
    await request
      .post(routes.anecdotes.create)
      .set('Accept', 'application/json')
      .send(TEST_ANECDOTES_DATA)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        anecdoteId = res.body.id;
        expect(res.body).toMatchObject({
          text: TEST_ANECDOTES_DATA.text,
          votes: TEST_ANECDOTES_DATA.votes
        });
      });
  });

  test('should get a anecdote by id', async () => {
    await request
      .get(routes.anecdotes.getById(anecdoteId))
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toMatchObject({
          text: TEST_ANECDOTES_DATA.text,
          votes: TEST_ANECDOTES_DATA.votes
        });
      });
  });

  test('should delete anecdote successfully', async () => {
    await request
      .delete(routes.anecdotes.delete(anecdoteId))
      .then(() => expect(204));

    await request.get(routes.anecdotes.getById(anecdoteId)).expect(404);
  });
});
