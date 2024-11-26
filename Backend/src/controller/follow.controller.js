import { Follow } from "../model/follow.model.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { Post } from "../model/post.model.js";
const loginuserdetail=async(req,res)=>{
    const token =req.cookies.accessToken;
  console.log(" the current token is ", token);
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
  console.log("d-------", user);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  req.user = user;
  const loginuser=req.user;
  return res.status(201).json({loginuser:loginuser})
}
const followfunction=async(req,res)=>{
    const followerid=req.params.followerId;
    const followingid=req.params.followingId;
    console.log("the follower id is ",followerid)
    console.log("the following id is ",followingid)
    const follow=await Follow.create({
        Follower:followerid,
        Following:followingid
    })
    console.log("------all the details of follow ",follow)
}

const followerdetails = async (req, res) => {
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
    const loginUser = req.user;
    console.log("heyyyyyy",loginUser)
  
    const fetchFollowerDetails = await Follow.find({ Following: loginUser.username});
    console.log("-ddddd",fetchFollowerDetails)
    if (!fetchFollowerDetails || fetchFollowerDetails.length === 0) {
      throw new ApiError(404, "No followers found");
    }
    
    const followerIds = fetchFollowerDetails.map(follow => follow.Follower);
    const allfollowerinfo=await User.find({username:followerIds})
    console.log("--the follower id is ",allfollowerinfo)
    const followerid=allfollowerinfo.map(user=>user._id);
    const followerusername=allfollowerinfo.map(user=>user.username)
    const posts = await Post.find({ author: { $in: followerid } });
    const allPostDetails = posts.map(post => post.Postimage);
    const allpostcaption=posts.map(post=>post.caption);
    console.log("the follower image is  details is ",allPostDetails);
    
    return res.status(200).json({ allPostDetails: allPostDetails ,followerusername:followerusername, allpostcaption: allpostcaption});
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export {followerdetails,loginuserdetail,followfunction}

