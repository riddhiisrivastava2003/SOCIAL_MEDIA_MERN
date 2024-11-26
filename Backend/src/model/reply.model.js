import mongoose ,{Schema} from "mongoose";

const replySchema=new Schema({
    commentid:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    },
    Postid:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    Authorid:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    Message:{
        type:String,
        required:true,
    },
    Targetid:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
   
},{timestamps:true})

export const Reply=mongoose.model("Reply",replySchema)