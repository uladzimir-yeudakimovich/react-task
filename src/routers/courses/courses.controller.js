const Course = require('../../models/course.model');

const getAll = async () => Course.find({});
const addCourse = async course => Course.create(course);
const deleteCourse = async id => Course.findByIdAndDelete(id);

module.exports = { getAll, addCourse, deleteCourse };
