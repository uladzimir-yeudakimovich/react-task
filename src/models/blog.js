const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: String,
    author: String,
    url: String,
    likes: Number
  },
  { versionKey: false }
);

blogSchema.statics.toResponse = blog => {
  const { id, title, author, url, likes } = blog;
  return { id, title, author, url, likes };
};

const Blog = model('Blog', blogSchema);

module.exports = Blog;
