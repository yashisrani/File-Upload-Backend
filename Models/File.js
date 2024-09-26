const mongoose = require('mongoose');
require('dotenv').config();
const nodemailer = require('nodemailer');

const fileschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

// post middlewares (post middlewares used when we want to excute something before db entry)
fileschema.post('save', async function (doc){
    try{

        // transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            },
          });

          // send mail
          let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: doc.email,
            subject: 'New Image Uploaded',
            text: `A new image named ${doc.name} has been uploaded. Image URL: ${doc.imageurl}`,
          })
          
    }
    catch(err){
        console.log(err);
        
    }
})

const file = mongoose.model('file', fileschema);
module.exports = file;