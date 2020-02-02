var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middleware = require("../middleware");

var checkCampgroundOwnership = middleware.checkCampgroundOwnership;
var isLoggedIn = middleware.isLoggedIn;

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
router.post("/", isLoggedIn, function(req,res){
     var name = req.body.name;
     var image = req.body.image;
     var desc = req.body.description;
     var author = {
         id: req.user._id,
         username: req.user.username
     }
     var newCampGround = {name:name, image:image, description:desc, author:author};
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
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campgrounds/new");    
});

// SHOW - Shows info about one campground.
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

// EDIT - Show form to edit campgrounds.

router.get("/:id/edit", checkCampgroundOwnership, function(req,res){
   var id = req.params.id;
   Campground.findById(id, function(err, foundCampground){
      if(err){
          req.flash("error", "Error occurred while editting.");
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          res.render("campgrounds/edit", {campground: foundCampground});
      } 
   });
});

// UPDATE - Update campgrounds.

router.put("/:id",checkCampgroundOwnership, function(req,res){
   // Find and update correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, update){
      if(err){
          req.flash("error", err.message);
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          req.flash("success", "Campground updated successfully!");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

// DESTROY - Delete a campground

router.delete("/:id",checkCampgroundOwnership, function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", err.message);
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Campground deleted successfully!");
           res.redirect("/campgrounds");
       }
   })
});


module.exports = router;