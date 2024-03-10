const mongoose = require("mongoose");
const ContentCreator = require("../models/ContentCreatorModel.js")
const PostSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    youtube_link: {
        type: String,
        required: true,
    },
    instagram_link: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    // Subscriber_Count:{
    //     type:Number,
    //     required:true
    // },
    // No_of_videos:{
    //     type:Number,
    //     required:true
    // },
    // Total_Views:{
    //     type:Number,
    //     required:true
    // },
    contenttypes: {
        type: [String],
        required: true,
    },
    contentCreator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentCreator',
        required: true,
    },
    contentCreatorType:{
        type: String,
        required: true,
    }
},
{
    timestamps: true
});
const Posts = mongoose.model('Posts',PostSchema);
module.exports = Posts;