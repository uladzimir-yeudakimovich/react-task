const uuid = require('uuid');
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
      unique: true
    },
    number: { type: String, required: true, minlength: 8, trim: true },
    date: { type: Date, default: new Date() }
  },
  { versionKey: false }
);

personSchema.statics.toResponse = person => {
  const { id, name, number } = person;
  return { id, name, number };
};

personSchema.plugin(uniqueValidator);

const Person = model('Person', personSchema);

module.exports = Person;
