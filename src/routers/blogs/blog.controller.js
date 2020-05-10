const Blog = require('../../models/blog');

const getAll = async () => Blog.find({});
const addBlog = async blog => Blog.create(blog);

module.exports = { getAll, addBlog };
