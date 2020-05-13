module.exports = {
  anecdotes: {
    getAll: '/api/anecdotes',
    getById: id => `/api/anecdotes/${id}`,
    create: '/api/anecdotes',
    update: id => `/api/anecdotes/${id}`,
    delete: id => `/api/anecdotes/${id}`
  },
  blogs: {
    getAll: '/api/blogs',
    getById: id => `/api/blogs/${id}`,
    create: '/api/blogs',
    update: id => `/api/blogs/${id}`,
    delete: id => `/api/blogs/${id}`
  },
  courses: {
    getAll: '/api/courses',
    getById: id => `/api/courses/${id}`,
    create: '/api/courses',
    update: id => `/api/courses/${id}`,
    delete: id => `/api/courses/${id}`
  },
  info: '/info',
  persons: {
    getAll: '/api/persons',
    getById: id => `/api/persons/${id}`,
    create: '/api/persons',
    update: id => `/api/persons/${id}`,
    delete: id => `/api/persons/${id}`
  }
};
