const Comment = require('../../models/comment');

const getAll = async id => Comment.find({ blogId: id });
const getComment = async id => Comment.findById(id);
const addComment = async (id, comment) => {
  comment.blogId = id;
  return Comment.create(comment);
};
const updateComment = async (id, comment) => {
  await Comment.findByIdAndUpdate(id, comment, {
    runValidators: true,
    context: 'query'
  });
  return Comment.findById(id);
};
const deleteComment = async id => Comment.findByIdAndDelete(id);

module.exports = {
  getAll,
  getComment,
  addComment,
  updateComment,
  deleteComment
};
