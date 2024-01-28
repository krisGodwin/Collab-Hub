/*const mongoose = require("mongoose");
const ContentCreator = require("../models/ContentCreatorModel.js");
const Hiring = require("../models/HiringModel.js");
const MessageSchema = new mongoose.Schema({
    bool : {
        type : Boolean,
        required : true,
    },
    contentCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentCreator',
        required: true,
    },
    hiring : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Hiring',
        required : true
    },
    messages: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: enum("ContentCreator","Hiring"),
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
})
const Message = mongoose.model('Message', MessageSchema);*/

module.exports = Message;