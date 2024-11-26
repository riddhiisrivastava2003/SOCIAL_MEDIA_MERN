import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


    const userlogout = async (req, res) => {
        res.status(200).redirect("/index.html"); 
    };

export{userlogout}