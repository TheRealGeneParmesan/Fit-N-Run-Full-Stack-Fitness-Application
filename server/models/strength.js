const { Schema, model } = require("mongoose");

const StrengthSchema = new Schema(
  {
    type: {
      type: String,
      default: "strength",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 25,
    },
    weight: {
      type: Number,
      required: false,
      integer: true,
    },
    sets: {
      type: Number,
      required: true,
      integer: true,
    },
    reps: {
      type: Number,
      required: true,
      integer: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

const Strength = model("Strength", StrengthSchema);

module.exports = Strength;
