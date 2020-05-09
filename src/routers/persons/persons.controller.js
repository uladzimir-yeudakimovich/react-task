const User = require('../../models/user.model');

const getAll = async () => User.find({});

const getUser = async id => User.findById(id);

const addUser = async user => User.create(user);

const updateUser = async (id, user) => {
  const findUserById = User.find({ _id: id });
  if (!(await findUserById).length) return;
  const findUserByIdAndName = User.find({ _id: id, name: user.name });
  const findUserByName = User.find({ name: user.name });
  if (!(await findUserByIdAndName).length && (await findUserByName).length) {
    return;
  }
  await User.findByIdAndUpdate(id, user);
  return User.find({ _id: id });
};

const deleteUser = async id => {
  const userForDelete = User.find({ _id: id });
  if (!(await userForDelete).length) return;
  await User.findByIdAndDelete(id);
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
