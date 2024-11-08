const mongoose = require('mongoose')

const mongo_url = process.env.MONGO_URI;

mongoose.connect('mongodb://localhost:27017/authdb')
    .then(()=>{
        console.log('Mongodb connected...')
    }).catch((err)=>{
        console.log('Connection error...',err);  
    })

// const mongoose = require('mongoose')

// const connectDB = (MONGO_URI)=>{
//     return mongoose.connect(MONGO_URI)
// } 



// module.exports = connectDB 