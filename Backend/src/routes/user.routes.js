import { Router } from "express";
import { registerUser ,loginuser} from "../controller/user.controller.js";
import { Postuser,deletepost,getAllImages,allimages } from "../controller/post.controller.js";
import { likepostbyuser } from "../controller/like.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { userdetail ,userfirstname} from "../controller/userdetail.controller.js";
import { useridentity } from "../controller/useridentity.controller.js";
import { postauthordetail } from "../controller/useridentity.controller.js";
import { Commentbyloginuser,replydatabase } from "../controller/comment.controller.js";
import { adminlogin } from "../controller/admin.controller.js";
import { allpost } from "../controller/admin.controller.js";
import { Allregisteruserdetail } from "../controller/admin.controller.js";
import { deleteuserdetail } from "../controller/admin.controller.js";
import { deleteuserpost } from "../controller/admin.controller.js";
import { allcomment } from "../controller/admin.controller.js";
import { allreply } from "../controller/admin.controller.js";
import { deleteusercomment } from "../controller/admin.controller.js";
import { deleteuserreply } from "../controller/admin.controller.js";
import { checkauthorization } from "../middlewares/authentication.middleware.js";
import { checkadminlogin} from "../middlewares/authentication.middleware.js";
import { loginuserdetail } from "../controller/follow.controller.js";
import { followfunction } from "../controller/follow.controller.js";
import { followerdetails } from "../controller/follow.controller.js";
import { checklogout } from "../middlewares/authentication.middleware.js";
import { userlogout } from "../controller/logout.controller.js";
import { chatbot } from "../controller/chatbot.controller.js";
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"Profilephoto",
            maxCount:1
        }
    ]),
    registerUser
)
router.route("/login").post(loginuser)
router.route("/Postuser").post(
    upload.fields([
        {
            name:"Postimage",
            maxCount:1
        }
    ]),
    Postuser
)
router.route("/:postId/like").post(checkauthorization,likepostbyuser)

router.route("/delete/:id").delete(checkauthorization,deletepost)
router.route("/image").get(checkauthorization,getAllImages)
router.route("/detailuser/:id").get(userdetail)
router.route("/allpost").get(checkauthorization,allimages)
router.route("/usernamedetail/:id").get(checkauthorization,userfirstname)
router.route("/useridd").get(checkauthorization,useridentity)
router.route("/postdetailcomment/:id").get(checkauthorization,postauthordetail)
router.route("/commentbyuser").post(checkauthorization,Commentbyloginuser)
router.route("/replybyuser").post(checkauthorization,replydatabase)
router.route("/adminlogin").post(adminlogin)
router.route("/allpostadmin").get(checkadminlogin,allpost)
router.route("/alluserdetailforadmin").get(checkadminlogin,Allregisteruserdetail)
router.route("/userdeletepermanent/:id").delete(deleteuserdetail)
router.route("/userpostdeleted/:id").delete(deleteuserpost)
router.route("/allcommentforadmin").get(checkadminlogin,allcomment)
router.route("/allreplyforadmin").get(allreply)
router.route("/deleteusercomment/:id").delete(deleteusercomment)
router.route("/deleteuserreply/:id").delete(deleteuserreply)
router.route("/loginuserdetail").get(loginuserdetail)
router.route("/follow/:followerId/:followingId").post(followfunction)
router.route("/followerdetail").get(followerdetails)
router.route("/logout").get(checklogout,userlogout)
router.route("/chat").post(chatbot)
export default router



