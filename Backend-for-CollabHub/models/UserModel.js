const mongoose = require("mongoose");

const UserType = Object.freeze({
    ContentCreator: 'ContentCreator',
    Hiring: 'Hiring',
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: Object.values(UserType),
        required: true,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserType };
