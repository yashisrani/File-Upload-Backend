const File = require('../Models/File')
const cloudinary = require('cloudinary').v2;


const localfileupload = async(req,res)=>{
   try{
       // fetch files 
       const file = req.files.file;   // req.files.(file) file is name of docuement, which is sent from postman

       // create path to store on server
       let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;        // current directory(controller) + file name + current time in milli-seconds + file name split with dot and array's first index
       
       // move file to server
       file.mv(path,(err)=>{
        console.log(err);
       })

       res.status(200).json({
        message:"file uploaded successfully",
        success : true,
       
       })
   }
   catch(err){
    res.status(500).json({
        message:"error while uploading file",
        success : false
    })
   }


}

module.exports = localfileupload;

function isFiletypeSupported(type,supportedtypes){
    return supportedtypes.includes(type);
}
const imageupload = async (req,res)=>{
    try{
        // data fetch
        const {name,tags,enmail } = req.body;
        const file = req.files.imagefile;


        // validation
        const supportedtypes = ["jpg", "png", "gif","webp"];

        // file type
        const filetype = file.name.split('.')[1].toLowerCase();
        
        if(!isFiletypeSupported(filetype,supportedtypes)){
            return res.status(400).json({
                success : false,
                message : "file type not supported"
            })
        }

        // upload to cloudinary
        const fileupload = await uploadFileToCloudinary(file,imagefile);
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "error while uploading image"
        })
    }
}

module.exports = imageupload;