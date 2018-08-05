var express = require("express");
var router = express.Router();
var User = require("../models/user");
// var Dumbdata = require("../models/dumbdata");


//INDEX - show all user
router.get("/", function(req, res) {
    User.find({}, function(err, allUser){
        if(err){
            console.log(err);
        } else {
            // console.log(allUser);
            res.render('index', {users: allUser});
        }
    })
});

router.get("/newpost", function(req, res) {
    res.render("newpost");
});

router.post("/newpost", function(req, res){
    var name = req.body.name;
    var jersey = req.body.jersey;
    var position = req.body.position;
    var active = req.body.active;
    var newRoster = {name:name, jersey:jersey, position:position, active:active}
    // console.log('newRoster', newRoster);
    User.create(newRoster, function(err, newuser){
        if(err){
            console.log(err);
            res.direct("/");
        } else {
            // console.log(newuser);
            // req.flash("success","Successfully created!");
            res.redirect('/');
        }
    });
});







router.get('/:id/edit', function (req, res){
    User.findById(req.params.id,  function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            console.log('foundUser', foundUser);
            console.log(foundUser.active);
            res.render('edit', {user: foundUser});
        }
    });
});

router.put('/:id', function(req, res){
    var newData = {name:req.body.name, jersey:req.body.jersey, position: req.body.position}
    console.log('newData', newData);
    User.findByIdAndUpdate(req.params.id, {$set:newData} , function(err, updatedUser){
        if(err){
            res.redirect("back");
            return handleError(err);
        } else {
            // req.flash("success","Successfully Updated!");
            console.log('updatedUser', updatedUser);
            res.redirect('/');
        }
    });
});

router.delete("/:id", function(req, res){

    User.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/');
        } else {
            console.log('done delete');
            res.redirect('/');
        }
    })
})

module.exports = router;