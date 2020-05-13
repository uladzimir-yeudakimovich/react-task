const blogRepo = require('./blog.controller');

const getAll = () => blogRepo.getAll();
const addBlog = blog => blogRepo.addBlog(blog);
const deleteBlog = id => blogRepo.deleteBlog(id);

module.exports = { getAll, addBlog, deleteBlog };
