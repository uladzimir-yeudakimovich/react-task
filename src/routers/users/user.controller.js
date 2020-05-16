const User = require('../../models/user.model');

const getAll = async () => User.find({});
const getUser = async id => User.findById(id);
const addUser = async user => User.create(user);
const updateUser = async (id, user) => {
  await User.findByIdAndUpdate(id, user, {
    runValidators: true,
    context: 'query'
  });
  return User.findById(id);
};
const deleteUser = async id => User.findByIdAndDelete(id);

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
