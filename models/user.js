var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({

    name: String,
    jersey: {type: Number, unique: true},
    position: String,
    active: Boolean,
    date: { type: Date, default: Date.now}  

});

module.exports = mongoose.model("User", UserSchema);