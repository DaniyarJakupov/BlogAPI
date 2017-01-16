const express = require('express'),
    app     = express(),
    bodyP   = require('body-parser');

//=================================================
const {mongoose}  = require('./db/mongoose');
const {Post}      = require('./models/post');
const {User}      = require('./models/user');
//=== App Config ==================================
app.use(bodyP.json());
app.use(bodyP.urlencoded({extended: true}));
//app.use(mOverride("_method"));
//=== ROUTES ======================================
app.post('/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save().then((doc)=>{
        res.send(doc);
    }, (error)=>{
        res.status(400).send(error);
    });
});

//==================================================
app.listen(3000, ()=>{
    console.log("Server is running on port 3000...");
});