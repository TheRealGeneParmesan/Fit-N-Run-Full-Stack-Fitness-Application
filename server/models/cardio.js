const { Schema, model } = require("mongoose");

const CardioSchema = new Schema(
    {
        type: {
            type: String,
            default: "cardio",
            required: true,
        },
        name: {
            type: String,
            required: true,
            maxlength: 25,
        },
        distance: {
            type: Number,
            required: false,
            integer: true,
        },
        duration: {
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

const Cardio = model("Cardio", CardioSchema);

module.exports = Cardio;
