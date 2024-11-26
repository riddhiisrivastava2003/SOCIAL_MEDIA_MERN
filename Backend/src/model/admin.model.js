import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const AdminSchema = new Schema({
    adminname:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true
    }
},{timestamps:true})

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    //console.log(this.Password); // This will run only when the user changes the password
    this.Password = await bcrypt.hash(this.Password, 10);
    //console.log(Password,this.Password) // Encrypting the password
    next(); // Use for middleware
});

/*userSchema.methods.isPasswordCorrect = async function(Password) {
    return await bcrypt.compare(Password, this.Password);
    // Comparing the password at the time of login
};*/
AdminSchema.methods.isPasswordCorrect = async function(Password) {
    // Check if Password is provided
    if (!Password) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.Password) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Password, this.Password);
};



export const Admin=mongoose.model("Admin",AdminSchema)      