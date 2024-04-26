const mongoose=require('mongoose');

const ratingModelSchema=new mongoose.Schema(
    {
        sponsor_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hiring"
        },
        creator_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        },
        sponsor_type:{
        type:String,
        },
        creator_type:{
            type:String
        },
        Fix_rating:{
            type:Number
        },
        click_count:{
            type:Number,
            default:0
        }
    }
)
const Rating = mongoose.model('Rating',ratingModelSchema);
module.exports = Rating;