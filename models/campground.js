// Campground Schema Setup

var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("campground", campgroundSchema);

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