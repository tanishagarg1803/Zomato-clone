import AWS from "aws-sdk";

//configure asw s3 bucket
const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"
});

//upload to aws server
export const s3Upload = (options) => {
    return new Promise((resolve, reject) =>
        s3Bucket.uploadPart(options, (error, data) => {
            if (error) return reject(error);
            return resolve(data);
        })
    );
};