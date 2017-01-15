const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/BlogApp', (error, db) => {
    if(error){
        return console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');

    // deleteMany
    // db.collection('Posts').deleteMany({title: 'new'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Posts').deleteOne({title: 'new'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    db.collection('Posts').findOneAndDelete({title: 'new'}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    //db.close();
});