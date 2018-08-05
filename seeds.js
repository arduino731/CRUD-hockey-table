var mongoose = require("mongoose");
// var Dumbdata = require("./models/dumbdata");

// mongoose.connect("mongodb://CRUD-hockey-table:hockey5@ds113122.mlab.com:13122/crud-hockey-table"); 
// mongoose.connect("mongodb://localhost/CRUD-hockey-table"); 

var data = [
    {
        name: "Brian", 
        jersey: 5,
        position: "Center"
    },
    {
        name: "Casey", 
        jersey: 11,
        position: "LW"
    },
    {
        name: "Trey", 
        jersey: 16,
        position: "RW"
    },
]


function seedDB(){
   //Remove all users
    Dumbdata.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");
         //add a few users
        data.forEach(function(seed){
            Dumbdata.create(seed, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    console.log(user);
                }
            });
        });
    }); 
}

module.exports = seedDB;
