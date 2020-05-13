const Blog = require('../../models/blog');

const getAll = async () => Blog.find({});
const addBlog = async blog => Blog.create(blog);
const deleteBlog = async id => Blog.findByIdAndDelete(id);

module.exports = { getAll, addBlog, deleteBlog };
