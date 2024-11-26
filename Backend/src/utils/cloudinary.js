import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({ 
    cloud_name: '', 
    api_key: '', 
    api_secret: '',
    secure: true
  });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("\n\n -- inside the uploadOnCloudinary function---\n");
    console.log(localFilePath);
    console.log(process.env.CLOUDINARY_API_KEY);

    if (!localFilePath) {
      console.error("Local file path is missing.");
      return null;
    }
    console.log("the local file path is missing",localFilePath)

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("localfilepath of cloudinary".response);

    // File has been uploaded successfully
    console.log("File is uploaded on Cloudinary:", response.url);

    // Remove the locally saved temporary file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);

    // Remove the locally saved temporary file as the upload operation failed
    fs.unlinkSync(localFilePath);

    // Return an object with a null 'url' property or handle the error appropriately
    return { url: null };
  }
};

export { uploadOnCloudinary };
