import mongoose ,{Schema} from "mongoose";

const FollowSchema=new Schema({
    Follower:{
        type:String,
        required:true,
    },
    Following:{
        type:String,
        required:true,
    }
},{timestamps:true})

export const Follow=mongoose.model("Follow",FollowSchema)