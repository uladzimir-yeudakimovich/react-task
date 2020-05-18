const blogRepo = require('./blog.controller');
const usersService = require('../users/user.service');
const User = require('../../models/user.model');

const getAll = () => blogRepo.getAll();

const addBlog = async (blog, id) => {
  const findUser = await usersService.getUser(id);
  const user = User.toResponse(findUser);
  blog.user = User.toResponse(findUser);
  const newBlog = await blogRepo.addBlog(blog);
  if (user.blogs) {
    user.blogs.push(newBlog);
  } else {
    user.blogs = [newBlog];
  }
  usersService.editUser(id, user);
  return newBlog;
};

const deleteBlog = id => blogRepo.deleteBlog(id);

module.exports = { getAll, addBlog, deleteBlog };
