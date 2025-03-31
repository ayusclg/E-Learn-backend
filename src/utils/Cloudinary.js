import { v2 as Cloud } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configuration
Cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return;
    const response = await Cloud.uploader.upload(localFilePath, {
      folder: "E-LEARN",
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error, "error in cloudinary");
  }
};
export { uploadCloud };
