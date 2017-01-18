require('./confg/config');
//================================================
const express   = require('express'),
    app         = express(),
    bodyP       = require('body-parser'),
    _           = require('lodash');

//=================================================
const {ObjectID} = require('mongodb');
const {mongoose}  = require('./db/mongoose');
const {Post}      = require('./models/post');
const {User}      = require('./models/user');
//=== App Config ==================================
app.use(bodyP.json());
app.use(bodyP.urlencoded({extended: true}));
const port = process.env.PORT;
//=== ROUTES ======================================
// POST request to create post
app.post('/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
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
            return res.status(404).send();
        }
        res.send({post});
    }).catch((e)=>{
        res.status(400).send();
    });
});

//DELETE request to delete one particular post
app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
    Post.findByIdAndRemove(id).then((post)=>{
        if(!post){
            return  res.status(404).send();
        }
        res.status(200).send({post});
    }).catch((e) => {
        res.status(400).send();
    });
});

// UPDATE (PATCH) request to update particular post
app.patch('/posts/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['title', 'content', 'image']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    Post.findByIdAndUpdate(id, {$set: body}, {new: true}).then((post) => {
        if(!post){
            return res.status(404).send();
        }
        res.send({post});
    }).catch((e) => {
        res.status(400).send();
    })
});
//==================================================
app.listen(port, () => {
    console.log(`Server is running  at port ${port}`);
});

//==================================================
module.exports = {app};