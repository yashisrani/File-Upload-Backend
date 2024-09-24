const express  = require('express');
const fileupload = require('express-fileupload');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// run db
const dbconnect = require('./Configs/database')
dbconnect();

//coonect with cloudinary
const cloudinaryconnect = require('./Configs/cloudinary');
cloudinaryconnect();

// moute routes
const routes = require('./Routes/FileUpload');
app.use('/api/v1', routes);
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

