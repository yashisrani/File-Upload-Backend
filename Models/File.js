const mongoose = require('mongoose');

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

module.exports = fileschema;