var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ===================================================
// Campground Routes
// ===================================================

// INDEX - Show all campgrounds.
router.get("/", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    
    });
    
});

// CREATE - Add new campground to DB.
router.post("/", function(req,res){
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var newCampGround = {name:name, image:image, description:desc};
     // Create a new campground and save it to database.
     Campground.create(newCampGround, function(err, newlyCreated){
         if(err){
             console.log(err);
         }
         else{
             res.redirect("/campgrounds");
         }
     });
});

// NEW - Show form to create new campgrounds.
router.get("/new", function(req, res) {
    res.render("campgrounds/new");    
});

// SHOW - Shows info about one campground
router.get("/:id", function(req,res){
    // Find campground based on id.
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }
       else{
           //console.log(foundCampground.comments);
           res.render("campgrounds/show", {campground: foundCampground});
       }
       
    });
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