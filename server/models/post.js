var mongoose = require('mongoose');

// Post Schema
var Post = mongoose.model('Post', {
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 140,
        trim: true
    },
    image: {
        type: String,
        default: 'http://i.imgur.com/LN8Lxyu.jpg'
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


