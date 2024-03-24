const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { S3Client, GetObjectCommand, PutObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {getPresignedUrl } = require('../utils/s3Utils');

const s3Client = new S3Client({
    region : 'ap-south-1' ,
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    }
});

const uploadImage =  async (req, res) => {
    try {
      const base64Image = req.body.image;
  
      if (!base64Image) {
        return res.status(400).send('Base64 encoded image is required.');
      }
  
      const matches = base64Image.match(/^data:image\/([A-Za-z]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).send('Invalid base64 encoded image format.');
      }
  
      const imageType = matches[1];
      const imageBuffer = Buffer.from(matches[2], 'base64');
      const imageName = uuidv4(); 
  
      let contentType;
      switch (imageType) {
        case 'jpeg':
        case 'jpg':
          contentType = 'image/jpeg';
          break;
        case 'png':
          contentType = 'image/png';
          break;
        default:
          return res.status(400).send('Unsupported image type.');
      }
  
      const s3Key = `uploads/user-uploads/${imageName}.${imageType}`;
      const putCommand = new PutObjectCommand({
        Bucket: 'eventifyx',
        Key: s3Key ,
        ContentType: contentType,
      });

      const preSignedUploadUrl = await getSignedUrl(s3Client, putCommand);
      
      await axios.put(preSignedUploadUrl, imageBuffer, {
        headers: {
          'Content-Type': contentType, 
        },
      });
  
      const preSignedUrl = await getPresignedUrl(s3Key);

      res.status(200).json({s3Key,preSignedUrl});

    } catch (error) {
      console.error('Error uploading image:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };


module.exports = {uploadImage};