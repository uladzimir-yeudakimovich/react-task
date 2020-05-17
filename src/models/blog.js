const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: String,
    author: String,
    user: {
      id: String,
      login: String,
      name: String
    },
    url: String,
    likes: Number
  },
  { versionKey: false }
);

blogSchema.statics.toResponse = blog => {
  const { id, title, author, user, url, likes } = blog;
  return { id, title, author, user, url, likes };
};

const Blog = model('Blog', blogSchema);

module.exports = Blog;
