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
  await blogService
    .addBlog(body)
    .then(result => {
      res.json(Blog.toResponse(result));
    })
    .catch(error => next(error));
});

module.exports = router;
