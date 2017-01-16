const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Post} = require('./../server/models/post');

const id = '587ca9524737f1ea2bc14555';

if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}
// // returns array of objects
// Post.find({_id: id}).then((posts) => {
//    console.log('Posts: ', posts);
// });
//
// //returns single object
// Post.findOne({_id: id}).then((post) => {
//     console.log('Post: ', post);
// });
//returns single object
Post.findById(id).then((post) => {
    if(!post){
        return console.log('Post not found');
    }
    console.log('Post by ID: ', post);
}).catch((e) => console.log(e));