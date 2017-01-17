const mongoose = require('mongoose');

// Post Schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 140,
        trim: true
    },
    image: {
        type: String,
        default: 'http://i.imgur.com/LN8Lxyu.jpg',
        minlength: 1,
        maxlength: 200,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
const Post = mongoose.model("Post", postSchema);

module.exports = {Post};