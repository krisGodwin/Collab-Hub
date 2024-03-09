const mongoose = require("mongoose");
const { User, UserType } = require("./UserModel");

const HiringSchema = new mongoose.Schema({
    // Add any fields specific to Hiring
    isFirstTime: {
        type: Boolean,
        default: true
    },
    recommedations: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

const Hiring = User.discriminator(UserType.Hiring, HiringSchema);

module.exports = Hiring;
