import mongoose ,{Schema} from "mongoose";

const commentSchema=new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    comment:{
        type:String,
        require:true,
    },
    Targetid:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

export const Comment=mongoose.model("Comment",commentSchema)