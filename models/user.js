var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

    username: String,
    password: String,
    Localpicture: String,

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        picture: String,
        link: String
    }
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);