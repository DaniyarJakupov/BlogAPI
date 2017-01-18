const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const dburl = process.env.DATABASEURL;
mongoose.connect(dburl);


module.exports = {mongoose};