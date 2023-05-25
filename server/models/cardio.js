const { Schema, model } = require("mongoose");

const CardioSchema = new Schema(
    {
        type: {
            type: String,
            default: "cardio",
            required: true
        },
        label: {
            type: String,
            required: true,
            maxlength: 25
        },
        distance: {
            type: Number,
            required: false
        },
        duration: {
            type: Number, 
            required: true
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
