const mongoose = require("mongoose");
const { User, UserType } = require("./UserModel");

const ContentCreatorSchema = new mongoose.Schema({
    contentTypes: {
        type: [String],
        required: true,
    },
    // Add any other fields specific to ContentCreator
});

const ContentCreator = User.discriminator(UserType.ContentCreator, ContentCreatorSchema);

module.exports = ContentCreator;
