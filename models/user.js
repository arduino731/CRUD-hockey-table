var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

    name: String,
    jersey: {type: Number, unique: true},
    position: String,
    active: Boolean

});

// UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);