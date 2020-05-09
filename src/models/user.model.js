const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const generateId = () => Math.floor(Math.random() * 1e10);

const userSchema = new Schema(
  {
    _id: { type: Number, default: generateId() },
    name: { type: String, required: true, trim: true, unique: true },
    number: { type: String, required: true, trim: true },
    date: { type: Date, default: new Date() }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, number } = user;
  return { id, name, number };
};

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = User;
