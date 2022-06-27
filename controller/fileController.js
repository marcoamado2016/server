const { request, response } = require("express");

const multer =require("multer")
const upload = multer({ dest: 'uploads/' })
const { uploadFile } = require("s3")
const postFile = (req = request, res = response) => {
    const body = req.files;
    console.log(body)
    return res.status(200).json(body)
}
const s3UploadFile = async(req,res)=>{
    const file=req.file;
   console.log(file)
    const result =await  uploadFile(file)
    console.log(result);
   
    res.send("OK")
}
const s3List = async (req = request, res = response) => {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise()
    let x = r.Contents.map((item) => { item.Key });
    
    return res.status(200).json(x);
}
const downLoadFile = async (req = request, res = response) => {
    const filename = req.params.filename;
    let x = await s3.getObject({ Bucket: BUCKET, key: filename }).promise();
    return res.status(200).json(x.Body);
}
const deletefile = async (req = request, res = response)=>{
const filename = req.params.filename;
 await s3.deleteObject({Bucket:BUCKET,Key:filename})
 return res.status(200).json("File deleted successfully")
}
module.exports = {
    postFile,
    s3UploadFile,
    s3List,
    downLoadFile,
    deletefile
}