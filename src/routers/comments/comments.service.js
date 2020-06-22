const commentsRepo = require('./comments.controller');
const blogService = require('../blogs/blog.service');
const Blog = require('../../models/blog');

const getAll = id => commentsRepo.getAll(id);
const getComment = id => commentsRepo.getComment(id);

const addComment = async (id, comment) => {
  const findBlog = await blogService.getBlog(id);
  const blog = Blog.toResponse(findBlog);
  const newComment = await commentsRepo.addComment(id, comment);
  blog.comments = blog.comments
    ? blog.comments.concat([{ id: newComment.id, comment: newComment.comment }])
    : [{ id: newComment.id, comment: newComment.comment }];
  blogService.editBlog(id, blog);
  return newComment;
};

const editComment = (id, comment) => commentsRepo.updateComment(id, comment);
const deleteComment = id => commentsRepo.deleteComment(id);

module.exports = {
  getAll,
  getComment,
  addComment,
  editComment,
  deleteComment
};
