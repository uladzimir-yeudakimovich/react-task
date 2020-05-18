const blogRepo = require('./blog.controller');
const usersService = require('../users/user.service');
const User = require('../../models/user.model');

const getAll = () => blogRepo.getAll();
const addBlog = async (blog, id) => {
  const user = await usersService.getUser(id);
  blog.user = User.toResponse(user);
  return blogRepo.addBlog(blog);
};
const deleteBlog = id => blogRepo.deleteBlog(id);

module.exports = { getAll, addBlog, deleteBlog };
