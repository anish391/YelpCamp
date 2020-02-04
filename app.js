var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require('connect-flash');
var session = require('express-session');

var User = require("./models/user");
var seedDB = require("./seeds")

var authRoutes = require("./routes/index")
var campgroundRoutes = require("./routes/campgrounds")
var commentRoutes = require("./routes/comments");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"; 
var mongooseObject = {
	useNewUrlParser: true,
	useCreateIndex: true
};
mongoose.connect(url, mongooseObject).then(()=>{
	console.log("Connected to MongoDB");
}).catch(err =>{
	console.log("ERROR: "+ err.message)
});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

//seedDB(); // Seed the database.

// ===================================================
// Passport Configuration
// ===================================================

app.use(session({
    secret: "Keyboard cat",
    resave: false,
    saveUninitialized: false
})); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});




// ===================================================
// Campground Routes
// ===================================================
app.use("/campgrounds", campgroundRoutes);
// ===================================================
// COMMENTS ROUTES
// ===================================================
app.use("/campgrounds/:id/comments",commentRoutes);
// ===================================================
// Authentication Routes
// ===================================================
app.use(authRoutes);
// ===================================================
// Middleware
// ===================================================

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

var port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function(){
   console.log("The YelpCamp server has started on port +"port+"!"); 
});



// db.campgrounds.drop()