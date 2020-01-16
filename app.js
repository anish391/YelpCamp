var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://www.jweekly.com/wp-content/uploads/2018/10/BAfireanniversary-rebuilding-crop-e1539620545679.jpg"},
    {name: "Salmon Hill", image: "https://media.chatterblock.com/cache/77/94/779409f9b3959d491ee298581a119684.jpg"},
    {name: "Salmon Crest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"},
    {name: "Salmon Creek", image: "https://www.jweekly.com/wp-content/uploads/2018/10/BAfireanniversary-rebuilding-crop-e1539620545679.jpg"},
    {name: "Salmon Hill", image: "https://media.chatterblock.com/cache/77/94/779409f9b3959d491ee298581a119684.jpg"},
    {name: "Salmon Crest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"},
    {name: "Salmon Creek", image: "https://www.jweekly.com/wp-content/uploads/2018/10/BAfireanniversary-rebuilding-crop-e1539620545679.jpg"},
    {name: "Salmon Hill", image: "https://media.chatterblock.com/cache/77/94/779409f9b3959d491ee298581a119684.jpg"},
    {name: "Salmon Crest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"},
    {name: "Salmon Creek", image: "https://www.jweekly.com/wp-content/uploads/2018/10/BAfireanniversary-rebuilding-crop-e1539620545679.jpg"},
    {name: "Salmon Hill", image: "https://media.chatterblock.com/cache/77/94/779409f9b3959d491ee298581a119684.jpg"},
    {name: "Salmon Crest", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6aFshQYf-HfYeBppmCFdl4WXoKZvjbt8o9igwhSbqxhzSIECaSQ&s"}
];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){

    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req,res){
     var name = req.body.name;
     var image = req.body.image;
     var newCampGround = {name:name, image:image};
     campgrounds.push(newCampGround);
     res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");    
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp server has started!"); 
});