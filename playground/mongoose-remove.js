const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Post} = require('./../server/models/post');

const id = '587ca9524737f1ea2bc14555';

// Remove everything
// Post.remove({}).then((result) => {
//    console.log(result);
// });

// FindOneAndRemove
// OR
// FindByIdAndRemove
Post.findByIdAndRemove('587e70c8eefebd3cc5b88ffe').then((post) => {
   console.log(JSON.stringify(post));
});