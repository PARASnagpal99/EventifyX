const { S3Client, GetObjectCommand, PutObjectCommand} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
    region : 'ap-south-1' ,
    credentials : {
        accessKeyId : process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
    }
});

const getObject = async (req, res) => {
    try {
        const key = "uploads/user-uploads/" + req.params;
        // console.log(key);
        if (!key) {
            return res.status(400).json({ error: 'Key parameter is missing' });
        }
        const command = new GetObjectCommand({
            Bucket: 'eventifyx',
            Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, command);
        return res.status(200).json({ signedUrl });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}


const putObject = async (req, res) => {
    try {
        const fileName = req.headers['filename']; 
        const contentType = req.headers['content-type'];

        if (!fileName || !contentType) {
            return res.status(400).send('Filename and Content-Type headers are required.');
        }

        const command = new PutObjectCommand({
            Bucket: 'eventifyx',
            Key: `uploads/user-uploads/${fileName}`,
            ContentType: contentType
        });
        const url = await getSignedUrl(s3Client, command);
        return res.status(200).send(url);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}



module.exports = {getObject , putObject};