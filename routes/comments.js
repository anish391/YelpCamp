var express = require("express");
var router = express.Router({mergeParams:true});

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// ===================================================
// COMMENTS ROUTES
// ===================================================

// NEW - Show form for new comment
router.get("/new", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

// CREATE - Create new comment
router.post("/", isLoggedIn, function(req,res){
   Campground.findById(req.params.id, function(err, campground) {
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      } 
      else{
         Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                // Add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // Save comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/"+campground._id);
            }
         });
      }
   });
});

// EDIT - Show form to edit comment.

router.get("/:comment_id/edit", checkCommentOwnership, function(req,res){
     Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit", {campgroundId:req.params.id, comment: foundComment});        
        }
     });
     
});

// UPDATE - Update a comment.

router.put("/:comment_id", checkCommentOwnership, function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/"+req.params.id);
       }
   })
});


// DESTROY - Delete a comment.

router.delete("/:comment_id", checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("back");
        }
    })
})

// ===================================================
// Middleware
// ===================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("/campgrounds/"+req.params.id);
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
} 

module.exports = router;