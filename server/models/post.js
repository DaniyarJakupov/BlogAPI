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
        required: true,
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

// var newPost = new Post({
//     title: 'New post 2',
//     image: 'empty',
//     content: 'This is new post 2'
// });

// newPost.save().then((doc) => {
//     console.log("Saved post", JSON.stringify(doc, undefined, 2));
// }, (error) => {
//     console.log("Unable to save post")
// });


