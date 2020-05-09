const Course = require('../../models/course.model');

const getAll = async () => Course.find({});
const addCourse = async course => Course.create(course);

module.exports = { getAll, addCourse };
