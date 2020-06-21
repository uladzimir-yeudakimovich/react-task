const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    comment: { type: String, required: true },
    blogId: { type: String, required: true }
  },
  { versionKey: false }
);

commentSchema.statics.toResponse = comments => {
  const { id, comment, blogId } = comments;
  return { id, comment, blogId };
};

const Comment = model('Comment', commentSchema);

module.exports = Comment;
