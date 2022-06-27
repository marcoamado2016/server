require('dotenv').config();
const { Router } = require("express");
const router = Router()
const multer =require("multer")
const upload = multer({ dest: 'uploads/' })
const {uploadFile, getFileStream} = require("../controller/s3")
/*
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const { postFile, s3UploadFile, s3List, downLoadFile, deletefile } = require("../controller/fileController")
router.post("/imagen", upload.array('file'), postFile)

const S3 = require("aws-sdk/clients/s3");
const multerS3 = require("multer-s3")

const s3 = new S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
})
const BUCKET = process.env.BUCKET;
const upload1 = multer({
    storage: multerS3({
        bucket:BUCKET,
        s3: s3,
        acl: "public-read",
        key: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })


})

router.post("/upload",upload1.single("file"),s3UploadFile)

router.get("/list",s3List)
router.get("/download/:filename",downLoadFile)

router.delete("/delete/:filename",deletefile)


*/
router.post("/imagenes",upload.single('image'),async(req,res)=>{
 const file=req.file;
console.log(file)
 const result =await  uploadFile(file)
 console.log(result);

 res.send({image:`images/${result.Key}`})
})
router.get('/images/:key',(req,res)=>{
    console.log(req.params)
const Key = req.params.key;
const readStream = getFileStream(Key)
readStream.pipe(res)
})
module.exports = router;