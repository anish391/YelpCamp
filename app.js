var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// Schema Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
var Campground = mongoose.model("campground", campgroundSchema);

// Campground.create({
//     name: "Salmon Hill", 
//     image: "https://media.chatterblock.com/cache/77/94/779409f9b3959d491ee298581a119684.jpg",
//     description:"Lorem Ipsum Dolor Bla Bla Bla Something Something"
// }, function(err, campground){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
// });



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
            res.render("index",{campgrounds:allCampgrounds});
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
    res.render("new");    
});

// SHOW - Shows info about one campground
app.get("/campgrounds/:id", function(req,res){
    // Find campground based on id.
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampground){
       if(err){
           console.log(err);
       }
       else{
           res.render("show", {campground: foundCampground});
       }
       
    });
})



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp server has started!"); 
});


// db.campgrounds.drop()