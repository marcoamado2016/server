require("dotenv").config()
const fs = require("fs")
const S3 = require("aws-sdk/clients/s3")
const secretAccessKey = process.env.ACCESS_SECRET;
const accessKeyId = process.env.ACCESS_KEY;
const region = process.env.REGION;
const bucketName = process.env.BUCKET;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})
const uploadFile = (file) => {
    console.log(file)
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename

    }

    return s3.upload(uploadParams).promise()
}

const getFileStream = (filekey) => {
    const downLoadParams = {
        Key: filekey,
        Bucket: bucketName
    }

    return  s3.getObject(downLoadParams).createReadStream()
}

module.exports = { uploadFile, getFileStream }