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

async function uploadFileToCloudinary(file,folder,quality) {       //make function async , because we want to upload file to cloud or database
    const options = {folder};
    if (quality) {
        options.quality = quality;
    }
     options.resource_type = "auto"
    return  await cloudinary.uploader.upload(file.tempFilePath,options);
}

const imageupload = async (req,res)=>{
    try{
        // data fetch
        const {name,tags,email} = req.body;
        // console.log(name,tags,email);
        

        const imagefile = req.files.imagefile;
        console.log(imagefile);
        

        // validation
        const supportedtypes = ["jpg", "png", "gif","webp","jpeg"];

        // to identify our file type
        const filetype = imagefile.name.split('.')[1].toLowerCase();
        // console.log("filetype", filetype);
        
        
        if(!isFiletypeSupported(filetype,supportedtypes)){
            return res.status(400).json({
                success : false,
                message : "file type not supported"
            })
        }

        // file is supported
        // upload to cloudinary
        console.log("uploading to cloudinary");
        
        const fileupload = await uploadFileToCloudinary(imagefile,"yash");   // (file,"cloudinary_folder_name")
        console.log(fileupload);

        
        

        // db me entry save karni hai ..
        // const filedata = await File.create({
        //     name,
        //     imageurl: fileupload.secure_url,
        //     tags,
        //     email
        // });

        res.status(200).json({
            success : true,
            message : "image uploaded successfully",
            
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "error while uploading image"
        })
    }
}

module.exports = imageupload;

function isFiletypeSupported(type,supportedtypes){
    return supportedtypes.includes(type);
}

async function uploadFileToCloudinary(file,folder) {       //make function async , because we want to upload file to cloud or database
    const options = {folder};
    options.resource_type = "auto";
    return  await cloudinary.uploader.upload(file.tempFilePath,options);
}

const videoupload = async(req,res)=>{
    try{
        const {name,tags,email} = req.body;

        const videofile = req.files.videofile;

        // validation
        const supportedtypes= ["mp4", "mp3", "mov"];

        const filetype = videofile.name.split('.')[1].toLowerCase();
        console.log(filetype);
        

        if(!isFiletypeSupported(filetype,supportedtypes)){
            return res.status(400).json({
                success : false,
                message : "file type not supported"
            })
        }

        // upload to cloudinary
        console.log("uploading to cloudinary");
        console.log("yaa baby");
        
        const fileupload = await uploadFileToCloudinary(videofile, "yash");   // (file,"cloudinary_folder_name")
        console.log(fileupload);


        res.status(200).json({
            success : true,
            message : "video uploaded successfully",
            
        })
        
    }

  

    catch(err){
        res.status(500).json({
            success : false,
            message : "error while uploading video"
        })
    }
}

module.exports = videoupload;

const imagesizereducer = async (req,res)=>{
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);
        

        const imagefile = req.files.imagefile;
        console.log(imagefile);
        

        // validation
        const supportedtypes = ["jpg", "png", "gif","webp","jpeg"];

        // to identify our file type
        const filetype = imagefile.name.split('.')[1].toLowerCase();
        console.log("filetype", filetype);
        
        
        if(!isFiletypeSupported(filetype,supportedtypes)){
            return res.status(400).json({
                success : false,
                message : "file type not supported"
            })
        }

        // file is supported
        // upload to cloudinary
        console.log("uploading to cloudinary");
        
        // HW - Decrease size by height and width 
        const fileupload = await uploadFileToCloudinary(imagefile,"yash", 50);   // (file,"cloudinary_folder_name")
        console.log(fileupload);

        
        

        // db me entry save karni hai ..
        // const filedata = await File.create({
        //     name,
        //     imageurl: fileupload.secure_url,
        //     tags,
        //     email
        // });

        res.status(200).json({
            success : true,
            message : "image uploaded successfully",
            
        })
    }
    catch(err){
        res.status(500).json({
            success : false,
            message : "error while resizing image"
        })
    }
}

module.exports = imagesizereducer;