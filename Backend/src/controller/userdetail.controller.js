
import { Post } from "../model/post.model.js";
import { ApiError } from "../utils/ApiError.js";;
import { User } from "../model/user.model.js";
import { Comment } from "../model/comment.model.js";
import { Reply } from "../model/reply.model.js";
const userdetail = async (req, res) => {
  try {
    const userid = req.params.id;
    console.log("--------getting id from display ", userid);

    const alluserdetail = await User.find({ _id: userid });
    console.log("----user model details are ", alluserdetail);

    const alldetailsuser = await Post.find({ author: userid });
    const postis = alldetailsuser.map(post => post._id);

    const allcomment = await Comment.find({ post: postis });
    const allreplyies = await Reply.find({ Postid: postis });

    console.log("--------the all comments are ", allcomment);
    console.log("----------all replies are ", allreplyies);
    console.log("the posts id are ", postis);
    console.log("all details of user are ", alldetailsuser);

    // Return the data as a JSON response
    return res.status(200).json({
      user: alluserdetail,
      posts: alldetailsuser,
      comments: allcomment,
      replies: allreplyies,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};




const userfirstname=async(req,res)=>{
  try {
    const namesvalue=req.params.id;
    console.log("----the value of --",namesvalue);
    const allname=await User.find({username:{ $regex: '^' + namesvalue, $options:'i'}})
    console.log("the username starts with A ",allname);
    const namesonly=allname.map(user=> ({ user:user.username ,  id : user.id}));
    console.log("-------the first letter of name is ",namesonly);
    return res.status(200).json({allname : allname,namesonly : namesonly})
  } catch (error) {
    throw new ApiError(501,"Internal error ",error)
  }
}
export {userdetail,userfirstname}

//$regex is used ki mujhe saare first letter 'A' se jitne bhi name hain user model me hain sabka name mil gayege and saari details mil gayegi

//$options : iska mltb hain ki lowercase and uppercase matter nhi karega sabh show karega saare name with letter  A 
