const router = require('express').Router();

const blogService = require('./blog.service');
const Blog = require('../../models/blog');

router.route('/').get(async (req, res, next) => {
  await blogService
    .getAll()
    .then(result => {
      res.json(result.map(Blog.toResponse));
    })
    .catch(error => next(error));
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  const { id } = req.decoded;
  await blogService
    .addBlog(body, id)
    .then(result => {
      res.json(Blog.toResponse(result));
    })
    .catch(error => next(error));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id: blogId } = req.params;
  const { id: userId } = req.decoded;
  await blogService
    .deleteBlog(blogId, userId)
    .then(result => {
      if (result) {
        return res.status(204).end();
      }
      res.status(412).json({ error: 'Precondition Failed' });
    })
    .catch(error => next(error));
});

module.exports = router;
