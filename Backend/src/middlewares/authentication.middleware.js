import jwt from "jsonwebtoken";
import { adminlogin } from "../controller/admin.controller.js";
import dotenv from "dotenv";
dotenv.config({
    path: './public/.env'
});

const secrettoken=process.env.ACCESS_TOKEN_SECRET


const checkauthorization=async(req,res,next)=>{
console.log("the secret token is ",secrettoken)
const token=req.cookies.accessToken;
console.log("the token is ",token)
if(!token){
    console.log("token not found ")
}
try {
    const decodetoken=jwt.verify(token,secrettoken);
    console.log("the decode token is ",decodetoken)
    req.user=decodetoken;
    next();
} catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });

}
}
const checklogout=async(req,res,next)=>{
    console.log("the secret token is ",secrettoken)
    const token=req.cookies.accessToken;
    console.log("the token is ",token)
    if(!token){
        console.log("token not found ")
    }
    try {
        const decodetoken=jwt.verify(token,secrettoken);
        console.log("the decode token is ",decodetoken)
        req.user=decodetoken;
        res.clearCookie('accessToken', {
            httpOnly: true, 
            secure: true,   
            expires: new Date(0), 
          });
      
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Unauthorized" });
    
    }
    }
const checkadminlogin=async(req,res,next)=>{
    try {
        if(adminlogin){
            next();
        }
        else{
            return res.status(401).json({message:"pehle login karle saste hacker"})
        }
    } catch (error) {
        console.error("adminlogin nhi hain bhhai ",error);
        return res.status(401).json({messsage:"kuch na khao chup he raho "});
    }
}



export {checkauthorization,checkadminlogin,checklogout}
