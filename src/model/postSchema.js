const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    }
},{timestamps:true})

const postCollections = mongoose.model('post', postSchema);
module.exports = postCollections