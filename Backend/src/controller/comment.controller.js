import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken"
import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";
import { Reply } from "../model/reply.model.js";
const Commentbyloginuser=async(req,res)=>{
    const{writername,targetname,comment,postid}=req.body
    try {
        if(!writername){
            throw new ApiError(204,"writername is required ")
        }
        if(!targetname){
            throw new ApiError(204,"targetname is required ")
        }
        if(!comment){
            throw new ApiError(204,"comment is required")
        }
        if(!postid){
            throw new ApiError(204,"postid is required ")
        }
        const allcomments = await Comment.create({
        author:writername,
        post:postid,
        comment:comment,
        Targetid:targetname
        })
        if(!allcomments){
            throw new ApiError(501,"Internal server error unable t save the comments in the database ")
        }
        const commentid=allcomments._id;
        console.log("-------the maincomment id is ",commentid)
        console.log("-----comments are saved ",allcomments)
        return res.status(201).json({allcomments:allcomments,commentid:commentid})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}
const replydatabase=async(req,res)=>{
    const {Targetname,writername,postid,replycomment,commentid}=req.body
    console.log(req.body);
    try {
        if(!Targetname){
            throw new ApiError(204,"targetname is required")
        }
        if(!writername){
            throw new ApiError(204,"writername is required")
        }
        if(!postid){
            throw new ApiError(204,"postid is required")
        }
        if(!replycomment){
            throw new ApiError(204,"replycomment is required")
        }
        if(!commentid){
            throw new ApiError(204,"commentid is required")
        }
        const allreply = await Reply.create({
            Authorid:writername,
            Postid:postid,
            Message:replycomment,
            Targetid:Targetname,
            commentid:commentid
            })
            if(!allreply){
                throw new ApiError(501,"Internal server error unable t save the replies in the database ")
            }
            console.log("-----reply are saved ",allreply)
            return res.status(201).json({allreply:allreply})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}
export {Commentbyloginuser,replydatabase}