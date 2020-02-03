var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ===================================================
// Root Route
// ===================================================

router.get("/", function(req,res){
    res.render("landing");
});

// ===================================================
// Registration Routes
// ===================================================

// Show register form
router.get("/register", function(req,res){
    res.render("register");
})

// Handle Sign Up
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, function(){
<<<<<<< HEAD
                req.flash("success", "Welcome to YelpCamp! " + user.username.charAt(0).toUpperCase() + user.username.slice(1));
=======
                req.flash("success", "Welcome to YelpCamp" + user.username.charAt(0).toUpperCase() + user.username.slice(1));
>>>>>>> 663fa3aa376982b22b8b78903901cfa723fbbd9f
                res.redirect("/campgrounds");
            })
        }
    })
});

// ===================================================
// Login Routes
// ===================================================

// Show Login Form 
router.get("/login", function(req,res){
    res.render("login");    
});

// Handling Login logic
router.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login"
}), function(req,res){
    
});

// ===================================================
// Logout Routes
// ===================================================

router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You are logged out!");
    res.redirect("/campgrounds");
});


// ===================================================
// Middleware
// ===================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;