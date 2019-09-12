var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	filter = require('content-filter'),
	mongoose 	= require("mongoose"),
	passport    = require("passport"),
    LocalStrategy = require("passport-local"),
	flash        = require("connect-flash"),
	methodOverride = require("method-override"),
	Review 		= require("./models/review"),
	Comment		= require("./models/comment"),
	User        = require("./models/user"),
	Basket        = require("./models/basket"),
	Order        = require("./models/order"),
	check		= require('express-validator');

var ReviewRoutes	= require("./routes/review"),
    commentRoutes 	= require("./routes/comment"),
    indexRoutes     = require("./routes/index");

var filterOptions = {
    urlBlackList:['$','{','&&','||'],
    bodyBlackList:['$','{','&&','||'],
    methodList:['POST', 'PUT', 'DELETE'],
 	dispatchToErrorHandler: true,
}

// mongoose.connect("mongodb://localhost:27017/sunshine", { useNewUrlParser: true });

const databaseUri = process.env.DATABASEURL || "mongodb://localhost:27017/sunshine";
mongoose.set('useFindAndModify', false);
mongoose.connect(databaseUri, { useNewUrlParser: true  })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//Pasport Config
app.use(require("express-session")({
    secret: "Cats and dogs are best friends",
    resave: false,
    saveUninitialized: false
}));


app.use(flash());
app.use(filter(filterOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass current user
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

//Handle Error from content filter
app.use(function(err, req, res, next) {
        res.status(err.status || 500);
			req.flash("error", "Invalid characters in your comment");
            res.redirect("back");
});

app.use(ReviewRoutes);
app.use(commentRoutes);
app.use(indexRoutes);

const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function(){
});