import {v2 as cloudinary} from "cloudinary"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
            if(!localFilePath) return null;
    
            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type:'auto'
            });
            console.log('File uploaded successfully on cloudinary: ', response.url)
            fs.unlinkSync(localFilePath)
            return response
    }catch (error) {
        console.log(error)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }

        return null
    }
}

export default uploadOnCloudinary;