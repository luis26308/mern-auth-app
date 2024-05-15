import { GridFsStorage } from 'multer-gridfs-storage';
import crypto from 'crypto';
import { extname } from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGO_URI, // Ensure this is correctly set in your .env file
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // Recommended options for MongoDB driver
    file: (req, file) => {
        // Check for the file type
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            // If it is an image, save to the 'photos' bucket with a custom filename
            return {
                bucketName: "profileImage", // It was "uploads" in your code, changed to 'photos' based on your comment
                filename: `${Date.now()}_${file.originalname}`, // Custom filename with timestamp
            };
        } else {
            // Files not matching the expected types are saved in the default bucket with a new filename
            return {
                bucketName: "other", // This is an example, you might not have an 'other' bucket setup
                filename: `${Date.now()}_${file.originalname}`
            };
        }
    },
});

export const upload = multer({storage});
