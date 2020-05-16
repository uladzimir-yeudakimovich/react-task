const uuid = require('uuid');
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { hash } = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, trim: true },
    login: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function update() {
  this._update.password = await hash(this._update.password, saltRounds);
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = User;
