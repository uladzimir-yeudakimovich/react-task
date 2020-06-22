const blogRepo = require('./blog.controller');
const usersService = require('../users/user.service');
const User = require('../../models/user.model');

const getAll = () => blogRepo.getAll();
const getBlog = id => blogRepo.getBlog(id);

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

const editBlog = async (blogId, blog) => {
  const userId = blog.user.id;
  const findUser = await usersService.getUser(userId);
  const user = User.toResponse(findUser);
  const index = user.blogs.findIndex(el => el.id === blogId);
  const { id, title, author, url, likes } = blog;
  user.blogs[index] = { _id: id, title, author, url, likes };
  usersService.editUser(userId, user);
  return blogRepo.updateBlog(blogId, blog);
};

const deleteBlog = async (blogId, userId) => {
  const findUser = await User.findById(userId);
  const user = User.toResponse(findUser);
  const checkUserBlog = await user.blogs.find(el => el.id === blogId);
  if (checkUserBlog) {
    const updateUserBlogs = await user.blogs.filter(el => el.id !== blogId);
    user.blogs = updateUserBlogs;
    usersService.editUser(userId, user);
    return blogRepo.deleteBlog(blogId);
  }
  return;
};

module.exports = { getAll, getBlog, addBlog, editBlog, deleteBlog };
