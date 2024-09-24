const mongoose = require('mongoose');

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(()=>console.log("DB is connected"))
    .catch((err)=>console.log("issues in db connection"))
}

module.exports = dbconnect;