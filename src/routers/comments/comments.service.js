const commentsRepo = require('./comments.controller');

const getAll = id => commentsRepo.getAll(id);
const getComment = id => commentsRepo.getComment(id);
const addComment = (id, comment) => commentsRepo.addComment(id, comment);
const editComment = (id, comment) => commentsRepo.updateComment(id, comment);
const deleteComment = id => commentsRepo.deleteComment(id);

module.exports = {
  getAll,
  getComment,
  addComment,
  editComment,
  deleteComment
};
