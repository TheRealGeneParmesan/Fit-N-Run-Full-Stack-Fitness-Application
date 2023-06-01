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
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
      get: (date) => date.toLocaleDateString(),
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
