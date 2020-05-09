const coursesRepo = require('./courses.controller');

const getAll = () => coursesRepo.getAll();
const addCourse = course => coursesRepo.addCourse(course);

module.exports = { getAll, addCourse };
