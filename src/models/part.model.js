const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const partSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: String,
    exercises: Number
  },
  { versionKey: false }
);

partSchema.statics.toResponse = part => {
  const { id, name, exercises } = part;
  return { id, name, exercises };
};

const Part = model('Part', partSchema);

module.exports = Part;
