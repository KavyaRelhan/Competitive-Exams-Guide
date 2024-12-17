const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    favorites: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true },
            source: { type: Object }, 
        },
    ],
})

const userModel = mongoose.model('users',userSchema);
module.exports = userModel;