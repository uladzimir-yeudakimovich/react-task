const uuid = require('uuid');
const { Schema, model, set } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { hash } = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: { type: String, trim: true },
    login: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 5
    },
    password: { type: String, required: true, minlength: 5 },
    blogs: [
      {
        _id: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        url: { type: String, required: true },
        likes: { type: Number, required: true }
      }
    ]
  },
  { versionKey: false }
);

userSchema.pre('save', async function save(next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre('findOneAndUpdate', async function update(next) {
  if (this._update.password) {
    this._update.password = await hash(this._update.password, saltRounds);
  }
  set('useFindAndModify', false);
  next();
});

userSchema.statics.toResponse = user => {
  const { id, name, login, blogs } = user;
  return { id, name, login, blogs };
};

userSchema.plugin(uniqueValidator);

const User = model('User', userSchema);

module.exports = User;
