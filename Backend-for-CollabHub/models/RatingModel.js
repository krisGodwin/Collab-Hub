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
        Total_Views:{
            type:String,
            required:true
        },
        Subscriber_Count:{
            type:String,
            default: "None"
        },
        No_of_videos:{
            type:String,
            default: "None"
        },
        clickcount:{
            type:Number,
            default:0
        }
    }
)

module.exports=mongoose.model("Rating",ratingModelSchema);