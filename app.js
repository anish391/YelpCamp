var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
<<<<<<< HEAD
var Comment = require("./models/comment");
=======
>>>>>>> 314e5b90957ff29ff5714065a49bb8bfabd0f0ef
var seedDB = require("./seeds")

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.get("/", function(req,res){
    res.render("landing");
});

// INDEX - Show all campgrounds.
app.get("/campgrounds", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    
    });
    
})

// CREATE - Add new campground to DB.
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");    
});

// SHOW - Shows info about one campground
app.get("/campgrounds/:id", function(req,res){
    // Find campground based on id.
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }
       else{
<<<<<<< HEAD
           //console.log(foundCampground.comments);
           res.render("campgrounds/show", {campground: foundCampground});
=======
           console.log(foundCampground.comments);
           res.render("show", {campground: foundCampground});
>>>>>>> 314e5b90957ff29ff5714065a49bb8bfabd0f0ef
       }
       
    });
});

// ===================================================
// COMMENTS ROUTES
// ===================================================

app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

app.post("/campgrounds/:id/comments", function(req,res){
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
                campground.comments.push(comment);
                campground.save();
                res.redirect("/campgrounds/"+campground._id);
            }
         });
      }
   });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp server has started!"); 
});


// db.campgrounds.drop()