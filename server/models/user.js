var mongoose = require('mongoose');

//User Schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
});
var User = mongoose.model("User", userSchema);

module.exports = {User};
// ===================================================
// var newUser = new User({
//     email: "mail@mail.com"
// });
//
// newUser.save().then((doc)=>{
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (error)=>{
//     console.log("Unable to save user");
// });