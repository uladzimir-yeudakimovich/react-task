const blogRepo = require('./blog.controller');

const getAll = () => blogRepo.getAll();
const addBlog = blog => blogRepo.addBlog(blog);

module.exports = { getAll, addBlog };
