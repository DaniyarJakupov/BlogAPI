const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/BlogApp', (error, db) => {
    if(error){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    db.collection('Posts').insertOne({
        title: 'new',
        content: 'This is new post in the blog app',
        image: 'empty',
        created: {type: Date, default: Date.now()}
    }, (error, result) => {
        if(error){
            return console.log('Unable to insert post', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close();
});