const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_APISECRET
    });

    try {
        const result = await cloudinary.uploader.upload(file);

     
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        return result.secure_url;

    } catch (error) {
        
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
        console.log("Cloudinary upload error:", error);
        
    }
}

module.exports = uploadOnCloudinary;
