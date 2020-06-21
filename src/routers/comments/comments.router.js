const router = require('express').Router({ mergeParams: true });

const commentsService = require('./comments.service');
const Comment = require('../../models/comment');

router.route('/').get(async (req, res, next) => {
  const { id } = req.params;
  await commentsService
    .getAll(id)
    .then(result => {
      res.json(result.map(Comment.toResponse));
    })
    .catch(error => next(error));
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  await commentsService
    .getComment(id)
    .then(result => {
      if (result) {
        res.json(Comment.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/').post(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await commentsService
    .addComment(id, body)
    .then(result => {
      res.json(Comment.toResponse(result));
    })
    .catch(error => next(error));
});

router.route('/:id').put(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  await commentsService
    .editComment(id, body)
    .then(result => {
      if (result) {
        res.json(Comment.toResponse(result));
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

router.route('/:id').delete(async (req, res, next) => {
  const { id } = req.params;
  await commentsService
    .deleteComment(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

module.exports = router;
