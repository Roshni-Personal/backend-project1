import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;
      //Upload file to cloudinary
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });

      //file has been successfully uploaded
      console.log("file is Uploaded on Cloudinary", response?.url);
      return response;
    } catch (err) {
      fs.unlinkSync(localFilePath); // remove locally saved temporary file as the upload operation got failed
      return null;
    }
  };

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: "shoes",
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);
})();
