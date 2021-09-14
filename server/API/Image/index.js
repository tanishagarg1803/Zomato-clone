//libraries
import express from "express";
import passport from "passport";
import AWS from "aws-sdk";
import multer from "multer";

//database models
import { ImageModel } from "../../database/allModels";

//utilities
import { s3Upload } from "../../Utils/AWS/s3";

//router setup
const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });


//upload given image to s3 bucket and saves file link to mongodb
/*
Route:           /
Description :    upload given image to s3 bucket and saves file link to mongodb
Params:          none
Access:          Public
Method:          get
*/
Router.get("/", upload.single("file"), async (req, res) => {
    try {

        const file = req.file;

        //s3 bucket
        const bucketOptions = {
            Bucket: "bucket name",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read",
        };

        const uploadImage = await s3Upload(bucketOptions);

        return res.status(200).json({ uploadImage });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;
