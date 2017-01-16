const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dburl = process.env.DATABASEURL || 'mongodb://localhost:27017/BlogApp';
mongoose.connect(dburl);


module.exports = {mongoose};