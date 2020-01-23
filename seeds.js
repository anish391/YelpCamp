var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var data = [
    {
        name: "Camp1", 
        image: "https://lazykcamping.com/assets/Slide-3-Field.jpg",
        description: loremIpsum
    },
    {
        name: "Camp2", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfPRRPSzCrQfgkgXSnuLw_PFevDwLU9ul1z1qQyDiHEVolOnQRig&s",
        description: loremIpsum
    },
    {
        name: "Camp3", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SGRwTMGI8u2EG0YfCID2N3eVa8y0MnyFKSdy0A6Fw1Wmt5Pn&s",
        description: loremIpsum
    },
    {
        name: "Camp4", 
        image: "https://i1.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg?resize=640%2C420",
        description: loremIpsum
    },
    {
        name: "Camp5", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2YUK_iZAuRLDxGJkb-ze_JKxBQHqw92SPGbMtOfqGtXshAeABw&s",
        description: loremIpsum
    }
];

function seedDB(){
    // Remove all existing campgrounds.
    Campground.remove({}, function(err){
        if(err){
            console.log("Removal error!");
        }else{
            // Add Few Campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                   if(err){
                       console.log(err);
                   }
                   else{
                       // Create a comment
                       var testComment = {
                           text: "Test Comment!",
                           author: "Anon"
                       }
                       Comment.create(testComment, function(err, comment){
                           if(err){
                               console.log(err);
                           }
                           else{
                               campground.comments.push(comment);
                               campground.save();
                           }
                       });
                   }
                });
            });
        }
    });    
    
    
}

module.exports = seedDB;