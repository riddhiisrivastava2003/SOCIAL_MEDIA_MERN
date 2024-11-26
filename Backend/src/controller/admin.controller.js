import { Admin } from "../model/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { Comment } from "../model/comment.model.js";
import { Reply } from "../model/reply.model.js";
const adminlogin=async(req,res)=>{
    const {adminname,Password}=req.body;
    try {
        if(!adminname){
            throw new ApiError(501,"adminame is required ")
        }
        if(!Password){
            throw new ApiError(501,"Password is required ")
        }
        const adminexist=await Admin.findOne({
            $or:[{adminname}]
        })
        if(!adminexist){
            throw new ApiError(501,"Admin doest not exist with the given name in database")
        }
        const Adminpasswordcheckig= await adminexist.isPasswordCorrect(Password)
        console.log("the actual pasword is ", Adminpasswordcheckig)
           
       if(!Adminpasswordcheckig){
        throw new ApiError(400,"password is incorrect try again ")
       }

       return res
       .redirect('/admin/dashboard.html')

    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const allpost=async(req,res)=>{
try {
    const allpost = await Post.find().populate('author');
    console.log("--all the post---",allpost)
    const allimage=allpost.map(post=>post.Postimage);
    const allcaption=allpost.map(post=>post.caption);
    const allpostids= allpost.map(post => ({ id: post._id}));
    console.log("-------all detail of all image ",allimage);
    const alldetailofimage=allpost.map(post=> ({ id: post._id, authorName: post.author.username }));
    console.log("--------all the detail of post",alldetailofimage);
    return res.status(200).json({allpost :allpost,allimage:allimage,alldetailofimage:alldetailofimage,allcaption:allcaption,allpostids:allpostids});
} catch (error) {
    console.log("Error agaya dada theek kro bhai ")
    throw new ApiError(500,"check kro fir se ",error);
}
}


const Allregisteruserdetail=async(req,res)=>{
    const alluserdetail=await User.find();
    const alluserusername=alluserdetail.map(user=>user.username)
    const alluserfirstname=alluserdetail.map(user=>user.FirstName)
    const alluserlastname=alluserdetail.map(user=>user.LastName)
    const alluseremail=alluserdetail.map(user=>user.Email)
    console.log("the all username are ",alluserusername);

    return res.status(200).json({alluserdetail:alluserdetail,alluserusername:alluserusername,alluserfirstname:alluserfirstname,alluserlastname:alluserlastname,alluseremail:alluseremail});
}


const deleteuserdetail=async(req,res)=>{
    const userid=req.params.id;
    console.log("user id is here ",userid);
    try {
     const deletedUser = await User.findByIdAndDelete(userid);
     const deletepostalso=await Post.findOneAndDelete({author:userid})
     if(deletedUser){
        return res.status(201).json({message:"User deleted successfully"})
        
        
     }
     return res.status(404).json({ message: 'User not deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteuserpost=async(req,res)=>{
    const postid=req.params.id;
    console.log("user id is here ",postid);
    try {
     const deletedpost = await Post.findByIdAndDelete(postid);

     if(deletedpost){
        return res.status(201).json({message:"User post deleted successfully"})
        
        
     }
     return res.status(404).json({ message: 'User post not  deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const allcomment=async(req,res)=>{
const allcomments=await Comment.find();
const allcommentids=allcomments.map(comment=>comment._id);
const allauthorid=allcomments.map(comment=>comment.author);
const allpostid=allcomments.map(comment=>comment.post);
const allcomment=allcomments.map(comment=>comment.comment);
return res.status(201).json({allcomments:allcomments});
}
const allreply=async(req,res)=>{
    const allreply=await Reply.find();
    return res.status(201).json({allreply:allreply});
}


const deleteusercomment=async(req,res)=>{
    const commentid=req.params.id;
    console.log("user id is here ",commentid);
    try {
     const deletedUsercomment = await Comment.findByIdAndDelete(commentid);
     if(deletedUsercomment){
        return res.status(201).json({message:"Usercomment  deleted successfully"})
        
        
     }
     return res.status(404).json({ message: 'User comment not deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteuserreply=async(req,res)=>{
    const replyid=req.params.id;
    console.log("user id is here ",replyid);
    try {
     const deletedUserreply= await Reply.findByIdAndDelete(replyid);
     if(deletedUserreply){
        return res.status(201).json({message:"User reply deleted successfully"})
        
        
     }
     return res.status(404).json({ message: 'User reply not deleted successfully' });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export {adminlogin,allpost,Allregisteruserdetail,deleteuserdetail,deleteuserpost,allcomment,allreply,deleteusercomment, deleteuserreply}