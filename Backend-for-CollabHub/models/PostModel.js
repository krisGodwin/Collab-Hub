const mongoose = require("mongoose");
const ContentCreator = require("../models/ContentCreatorModel.js")
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    contenttypes: {
        type: [String],
        required: true,
    },
    contentCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentCreator',
        required: true,
    },
},
{
    timestamps: true
});
const Posts = mongoose.model('Posts',PostSchema);
module.exports = Posts;