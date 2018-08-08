var express = require("express");
var User = require("../models/user");
// var User = require("../models/dumbdata");
var router = express.Router();

router.get("/", function(req, res) {
    User.find({}, function(err, allUser){
        if(err){
            console.log(err);
        } else {
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
    User.create(newRoster, function(err, newuser){
        if(err){
            console.log(err);
            res.direct("/");
        } else {
            res.redirect('/');
        }
    });
});

router.get('/:id/edit', function (req, res){
    User.findById(req.params.id,  function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render('edit', {user: foundUser});
        }
    });
});

router.put('/:id', function(req, res){
    var newData = { name: req.body.name, jersey: req.body.jersey, position: req.body.position, active: req.body.active};
    User.findByIdAndUpdate(req.params.id, {$set: newData} , function(err, user){
        if(err){
            res.redirect("/");
        } else {
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
            res.redirect('/');
        }
    })
})

module.exports = router;