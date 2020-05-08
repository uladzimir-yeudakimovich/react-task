const User = require('../../models/user.model');

const getAll = async () => User.find({});

const getUser = async id => User.findById(id);

const addUser = async user => {
  const userForSave = User.find({ name: user.name });
  if ((await userForSave).length) return;
  return User.create(user);
};

const updateUser = async (id, user) => {
  const findUserByName = User.find({ name: user.name });
  if (!(await findUserByName).length) return;
  await User.findByIdAndUpdate(id, user);
  return User.findById(id);
};

const deleteUser = async id => {
  const userForDelete = User.find({ _id: id });
  if (!(await userForDelete).length) return;
  await User.findByIdAndDelete(id);
};

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
