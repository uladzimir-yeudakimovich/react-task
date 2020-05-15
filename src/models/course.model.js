const uuid = require('uuid');
const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const courseSchema = new Schema(
  {
    _id: { type: String, default: uuid },
    name: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
      unique: true
    },
    parts: {
      type: [
        {
          _id: { type: String, default: uuid },
          name: String,
          exercises: Number
        }
      ],
      required: true
    }
  },
  { versionKey: false }
);

courseSchema.statics.toResponse = course => {
  const { id, name, parts } = course;
  return { id, name, parts };
};

courseSchema.plugin(uniqueValidator);

const Course = model('Course', courseSchema);

module.exports = Course;
