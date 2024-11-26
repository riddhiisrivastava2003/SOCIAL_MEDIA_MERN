import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../model/post.model.js";
const useridentity = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        console.log("The current token is ", token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken || !decodedToken._id) {
            throw new ApiError(401, "Invalid access token");
        }
        const user = await User.findById(decodedToken._id).select({
            password: 0,
            refreshToken: 0,
        });
        console.log("User:", user);
        if (!user) {
            throw new ApiError(401, "User not found");
        }
        req.user = user;
        const currentuser = req.user.username;
        const currentuserid=req.user._id;
        return res.status(201).json({userdetail:currentuser,currentuserid:currentuserid})
        console.log("-----the current user is ", req.user.username);
    } catch (error) {
        // Handle errors here
        console.error("Error:", error);
        // You might want to send an appropriate response to the client
        if (res) {
            res.status(error.statusCode || 500).json({ message: error.message });
        } else {
            // If 'res' is not available, log the error
            console.error("Response object 'res' not available.");
        }
    }
};

const postauthordetail=async(req,res)=>{
   try {
    const postid=req.params.id;
    console.log("---------------------------id after clicking the comment is ",postid);
const searchpost=await Post.findById(postid)
const userdetail = searchpost.author;
const author=await User.findById(userdetail)
const authorid=author._id;
const authorname=author.username;
console.log("--------the usernme of post after click ",authorname)
console.log("---------------------------post detail after clicking comment ",postid);
return res.status(201).json({authorname:authorname,authorid:authorid})
console.log("---the details of that post of the comment section is  ---",searchpost);
   } catch (error) {
    console.error("Error:", error);
   }
}
export {useridentity,postauthordetail}