var express = require("express");
var router = express.Router();
var User = require("../models/user");

//INDEX - show all user
router.get("/", function(req, res) {
    // User.find({}, function(err, allUser){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.render('/index', {users: allUser});
    //     }
    // })
    res.render('index');
});

router.get("/newpost", function(req, res) {
    res.render("newpost");

    // var newUser = new User({ name: req.body.name });
    // User.register(newUser, function(err, user) {
    //     if (err) {
    //         console.log(err);
    //     } 
    //     else {
    //         res.render("newpost");
    //     }
    // });
});

// router.post("/newpost", function(req, res){
//     User.create(req.body.id, function(err, newpost){
//         if(err){
//             console.log(err)
//             res.redirect('/');
//         } else {
//             newpost.name = req.body.name;
//             newpost.save();
//             console.log(newpost); 
//             res.redirect('/');
//         }
//     })    
// })

module.exports = router;