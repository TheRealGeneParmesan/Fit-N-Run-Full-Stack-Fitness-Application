const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: "Username is required",
    },
    password: {
        type: String,
        trim: true,
        required: "Password is required",
        minlength: 8,
    },
    email: {
        type: String,
        unique: true,
    },
    cardio: [{
        type: Schema.Types.ObjectID,
        ref: "Cardio"
    }],
    strength: [{
        type: Schema.Types.ObjectID,
        ref: "Strength"
    }]
});

UserSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const User = model("User", UserSchema);

module.exports = User;
