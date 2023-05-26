const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    cardio: [{
        type: Schema.Types.ObjectId,
        ref: "Cardio"
    }],
    strength: [{
        type: Schema.Types.ObjectId,
        ref: "Strength"
    }],
});

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    
    next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}
const User = model('User', UserSchema);

module.exports = User;
