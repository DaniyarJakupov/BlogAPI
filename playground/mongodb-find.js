const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/BlogApp', (error, db) => {
    if(error){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    // Find all posts inside collection
    // db.collection('Posts').find().toArray().then((docs) => {
    //     console.log('Posts');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch posts', error);
    // });

    // Count all posts inside collection
    db.collection('Posts').find().count().then((count) => {
        console.log(`Posts count: ${count}`);
    }, (error) => {
        console.log('Unable to fetch posts', error);
    });

    //db.close();
});