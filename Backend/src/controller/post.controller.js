import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../model/post.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
const Postuser=(async(req,res)=>{
    console.log("aara hai");
    const { caption, Category }=req.body;
    console.log(caption,Category)
    if(Category===""){
        throw new ApiError(400,"please select the category")
    }
   // Access the token from the headers
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
     return res.status(401).json({ message: "Unauthorized request" });
   }

   // Extract the token from the header
   const token = authHeader.split(" ")[1];

   console.log("The current token is", token);
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
 console.log(req.user._id);

    

const Postimagelocalpath=req.files?.Postimage?.[0]?.path;

if(!Postimagelocalpath){
    throw new ApiError(400,"file is not added or path is missing ")
}
const Postimage=await uploadOnCloudinary(Postimagelocalpath)

const post=await Post.create({
    caption,
    Category,
    Postimage:Postimage.url,
    author:req.user._id,
})
if(!post){
    throw new ApiError(409,"Sorry unable to  create post")
}
res.redirect('/display.html');
// return res.status(201).json(
//     new ApiResponse(200,post,"Post created succesfully")
// )
})


const deletepost=asyncHandler(async(req,res)=>{
    try {
        const postId=req.params.id;
        console.log("the single id is",req.params.id);
    
        const deletedpost= await Post.findByIdAndDelete(postId);

        if (!deletedpost) {
            throw new ApiError(404, "Task not found");
        }
        return res.status(200).json(
            new ApiResponse(200,"Post deleted Successfully",deletedpost)
        )
    } catch (error) {
        throw new ApiError(500,"server error",error)
        
    }
})

const updatepost=asyncHandler(async(req,res)=>{
    try {
        const PostId=req.params.id;
        const{caption,Postcategory}=req.body
        const updatedPost = await Post.findByIdAndUpdate(PostId, { caption,Postcategory}, { new: true });
        return res.status(200).json(
            new ApiResponse(200,updatedPost,"post updated successfully")
        )
    } catch (error) {
        throw new ApiError(500,"Internal server error try again")
    }
})



const getAllImages = async (req, res) => {
    try { // Fetch latest 3 posts


        const posts = await Post.find().populate('author');
       // console.log(posts) 
        const imageUrls = posts.map(post => post.Postimage);
        const PostCaption =posts.map(post=>post.caption);
       // console.log(PostCaption)
        const postid = posts.map(post => ({ id: post._id, authorName: post.author.username }));
        const postidonly = posts.map(post => ({ id: post._id,}));
      //  console.log(postid)
        const authorNames = posts.map(post => post.author.username);
     //   console.log(authorNames)
      //  console.log("the url of store image is ", imageUrls) 



        const latestPosts = await Post.find({}).sort({ createdAt: -1 }).limit(2);
        console.log("---------the latest post dertails are ",latestPosts)
        const authorIds = latestPosts.map(post => post.author);
        const authors = await User.find({ _id: { $in: authorIds } });
        const authorUsernames = authors.map(user => user.username);
        console.log("-------the authorr username is ",authorUsernames);

        const latestimage=latestPosts.map(post=>post.Postimage);

        const captionlatestone=latestPosts.map(post=>post.caption);
        console.log("------all the caption--------",captionlatestone);
        console.log("the latest imnages is ",latestimage)
        const latestpostids= latestPosts.map(post => ({ id: post._id}));

        return res.status(200).json({ images: imageUrls, posts: postid , authorName: authorNames  ,postcaption: PostCaption ,postidonlyy: postidonly, LatestPost: latestPosts, latestImage:latestimage,authorlatest:authorUsernames,latestcaption:captionlatestone,Latestpostids:latestpostids});
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const allimages=async(req,res)=>{
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
                const currentuser=req.user.username;
               console.log("-----the current user is ",req.user.username);
       const allpost = await Post.find().populate('author');
       console.log("--all the post---",allpost)
       const allimage=allpost.map(post=>post.Postimage);
       const allcaption=allpost.map(post=>post.caption);
       const allpostids= allpost.map(post => ({ id: post._id}));
       console.log("-------all detail of all image ",allimage);
       const alldetailofimage=allpost.map(post=> ({ id: post._id, authorName: post.author.username }));
       console.log("--------all the detail of post",alldetailofimage);
       return res.status(200).json({allpost :allpost,allimage:allimage,alldetailofimage:alldetailofimage,allcaption:allcaption,allpostids:allpostids,currentuser:currentuser});
    } catch (error) {
        console.log("Error agaya dada theek kro bhai ")
        throw new ApiError(500,"check kro fir se ",error);
        
    }
}


export {Postuser,deletepost,updatepost,getAllImages,allimages}