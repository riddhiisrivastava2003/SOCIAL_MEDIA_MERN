import mongoose ,{Schema} from "mongoose";

const postSchema=new Schema({
    caption:{
        type:String,
        required:true,
    },
    Postimage:{
        type:String,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    Category: {
        type: String,
        default: "personal"
    }
},{timestamps:true})

export const Post=mongoose.model("Post",postSchema)
