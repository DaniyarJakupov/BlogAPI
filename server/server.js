const express = require('express'),
    app = express(),
    bodyP = require('body-parser');

//=================================================
const {ObjectID} = require('mongodb');
const {mongoose}  = require('./db/mongoose');
const {Post}      = require('./models/post');
const {User}      = require('./models/user');
//=== App Config ==================================
app.use(bodyP.json());
app.use(bodyP.urlencoded({extended: true}));
//app.use(mOverride("_method"));
const port = process.env.PORT || 3000;
//=== ROUTES ======================================
// POST request to create post
app.post('/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save().then((doc) => {
        //console.log(JSON.stringify(doc, undefined, 2));
        res.send(doc);
    }, (error) => {
        res.status(400).send(error);
    });
});
// GET request to fetch all posts
app.get('/posts', (req, res) => {
    Post.find().then((posts) => {
        res.send({posts});
    }, (error) => {
        res.status(400).send(error);
    });
});
// GET request to fetch one particular post
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Post.findById(id).then((post) => {
        if(!post){
            res.status(404).send();
        }
        res.send({post});
    }).catch((e)=>{
        res.status(400).send();
    });
});

// DELETE request
// app.get('/posts/:id', (req, res) => {
//     const id = req.params.id;
//     if(!ObjectID.isValid(id)){
//         return res.status(404).send()
//     }
//     Post.findByIdAndRemove(id).then(()=>{
//
//     })
// });

//==================================================
app.listen(port, () => {
    console.log(`Server is running  at port ${port}`);
});

//==================================================
module.exports = {app};