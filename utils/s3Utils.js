const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { S3Client, GetObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region : 'ap-south-1' ,
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    }
});

const getPresignedUrl = async(key) => {
    try {
        if (!key) {
            return {error: 'Key parameter is missing' };
        }
        const command = new GetObjectCommand({
            Bucket: 'eventifyx',
            Key: key,
        });
        const signedUrl = await getSignedUrl(s3Client, command);
        return { signedUrl };
    } catch (error) {
        console.error("Error:", error.message);
        return { error: "Internal Server Error", details: error.message };
    }
}

module.exports = {
    getPresignedUrl
}
