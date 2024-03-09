const mongoose = require("mongoose");
const ContentCreator = require("../models/ContentCreatorModel.js")
const ContCreator = new mongoose.Schema({
    Creator_id:{
        type:String,
        required:true
    },
    contenttypes: {
        type: String,
        required: true,
    },
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
    // }
});
const CC = mongoose.model('Creator',ContCreator);
module.exports = CC;