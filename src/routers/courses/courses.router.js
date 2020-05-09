const router = require('express').Router();

const coursesService = require('./courses.service');
const Course = require('../../models/course.model');

router.route('/').get(async (req, res, next) => {
  await coursesService
    .getAll()
    .then(result => {
      res.json(result.map(Course.toResponse));
    })
    .catch(error => next(error));
});

router.route('/').post(async (req, res, next) => {
  const { body } = req;
  await coursesService
    .addCourse(body)
    .then(result => {
      res.json(Course.toResponse(result));
    })
    .catch(error => next(error));
});

module.exports = router;
