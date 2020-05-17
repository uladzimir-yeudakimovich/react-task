const blogRepo = require('./blog.controller');
const User = require('../../models/user.model');

const getAll = () => blogRepo.getAll();
const addBlog = async (blog, id) => {
  const user = await User.findById(id);
  blog.user = User.toResponse(user);
  return blogRepo.addBlog(blog);
};
const deleteBlog = id => blogRepo.deleteBlog(id);

module.exports = { getAll, addBlog, deleteBlog };
