var mongoose = require("mongoose");

var dumbdataSchema = new mongoose.Schema({
    name: String,
    jersey: {type: Number, unique: true},
    position: String,
    active: {type:Boolean, default: false},
    date: {type: Date, default: Date.now} 
});

module.exports = mongoose.model("Dumbdata", dumbdataSchema);