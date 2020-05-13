const coursesRepo = require('./courses.controller');

const getAll = () => coursesRepo.getAll();
const addCourse = course => coursesRepo.addCourse(course);
const deleteCourse = id => coursesRepo.deleteCourse(id);

module.exports = { getAll, addCourse, deleteCourse };
