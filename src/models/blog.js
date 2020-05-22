const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    author: { type: String, required: true },
    user: {
      id: { type: String, required: true },
      login: { type: String, required: true },
      name: String
    },
    url: { type: String, required: true },
    likes: { type: Number, default: 0 }
  },
  { versionKey: false }
);

blogSchema.statics.toResponse = blog => {
  const { id, title, author, user, url, likes } = blog;
  return { id, title, author, user, url, likes };
};

const Blog = model('Blog', blogSchema);

module.exports = Blog;
