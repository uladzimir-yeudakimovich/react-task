const Blog = require('../../models/blog');

const getAll = async () => Blog.find({});
const getBlog = async id => Blog.findById(id);
const addBlog = async blog => Blog.create(blog);
const updateBlog = async (id, blog) => {
  await Blog.findByIdAndUpdate(id, blog);
  return Blog.findById(id);
};
const deleteBlog = async id => Blog.findByIdAndDelete(id);

module.exports = { getAll, getBlog, addBlog, updateBlog, deleteBlog };
