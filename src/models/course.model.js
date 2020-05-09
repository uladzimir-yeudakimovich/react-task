const uuid = require('uuid');
const { Schema, model } = require('mongoose');

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
    postedBy: { type: Schema.Types.ObjectId, ref: 'Part' },
    parts: {
      type: [{ name: String, exercises: Number, by: Schema.Types.ObjectId }],
      required: true
    }
  },
  { versionKey: false }
);

courseSchema.statics.toResponse = course => {
  const { id, name, parts } = course;
  return { id, name, parts };
};

const Course = model('Course', courseSchema);

module.exports = Course;
