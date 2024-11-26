import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken';

const basicUserDetail = async (req, res) => {
  try {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
      throw new ApiError(401, "Authorization header is missing");
    }
    
    // Extract the access token from the authorization header
    const authorizationHeader = req.headers.authorization;
    const accessToken = authorizationHeader.split(' ')[1];

    // Verify the access token
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Find the user by ID using the decoded token
    const user = await User.findById(decodedToken._id).select({ _id: 1, username: 1, name: 1 });
    console.log("User model details:", user);

    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      // If there's an issue with the access token, return a 401 Unauthorized error
      res.status(401).json({ error: "Invalid ccess token" });
    } else {
      // For other errors, return a 500 Internal Server Error
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export { basicUserDetail };
