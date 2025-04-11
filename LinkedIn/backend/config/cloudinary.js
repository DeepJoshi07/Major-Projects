import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key:process.env.API_KEY , 
    api_secret:  process.env.API_SECRET
});

const uploadOnCloudinary = async (filePath) =>{
    try {
        const result = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        fs.unlinkSync
        console.log(error);
        
    }
}

export default uploadOnCloudinary;