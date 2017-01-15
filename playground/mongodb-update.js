const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/BlogApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    //findOneAndUpdate
    db.collection('Posts').findOneAndUpdate({title: 'new'},
        {
                $set: {
                title: 'new 1'
            }
        }, {
            returnOriginal: false
        }).then((result) => {
        console.log(result);
    });

    //db.close();
});