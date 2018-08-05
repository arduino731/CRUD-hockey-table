var mongoose = require("mongoose");

var dumbdataSchema = new mongoose.Schema({
   name: String,
   jersey: Number,
   position: String
});

module.exports = mongoose.model("Dumbdata", dumbdataSchema);