var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose"),
	Review 		= require("./models/review"),
	seedDB 		= require("./seed");
 

// mongoose.connect("mongodb://localhost:27017/sunshine", { useNewUrlParser: true });

const databaseUri = process.env.DATABASEURL || "mongodb://localhost:27017/sunshine";

mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

seedDB();

// var reviewSchema = new mongoose.Schema({
// 	star: String,
// 	image:String,
// 	reviewTitle:String,
// 	review:String
// });

// var Review = mongoose.model("Review",reviewSchema);


var home_image = [
		{tag:"farm", name: "Morning sun and grass", image: "https://drive.google.com/uc?id=1dRz1V6mmqg8R8mMlrlW_WtSvFE5XIJAw"},
		{tag:"farm", name: "Morning dew", image: "https://drive.google.com/uc?id=1V5SUSRFavMkNjXH-NZqry2PgXAEZMTPJ"},
		{tag:"farm", name: "Fresh Grass", image: "https://drive.google.com/uc?id=1nYkSVpQNIRKCFOvzQgQUbV_5vZM9-hZ4"},
		{tag:"farm", name: "Orange Blossom", image: "https://drive.google.com/uc?id=15-aHecBVE2S7CJS-5WFa1fpDQyWEO-yF"},
		{tag:"farm", name: "Orange", image: "https://drive.google.com/uc?id=15ci5gLmbWuPlh66obt03V5jM_4kHx15S"},
		{tag:"farm", name: "Fresh Grass2", image: "https://drive.google.com/uc?id=1KgVFI9Fbh-qtYpmXJIPe7Dx4gvvx3G5H"},
		{tag:"farm", name: "Flower", image:"https://drive.google.com/uc?id=1wW6aqUVeeXeuYFb97aFZKfq_ISylSwry"},
		{tag:"cafe", name: "Cozy and colorful cafe", image:"https://drive.google.com/uc?id=1B65wPFmlfy6iP_k99BXFPngkA0VBMAmz"},
		{tag:"cafe", name: "Hot and Iced Coffee", image:"https://drive.google.com/uc?id=1OZ2e-ZbDZEMhA26N3CSUol9AELIjBgEA"},
		{tag:"cafe", name: "Fresh fruit and vegetable juice", image: "https://drive.google.com/uc?id=1MrQixy20RePWQC7kKjHUGXvGE5iUayGZ"},
		{tag:"cafe", name: "Professional Barista", image:"https://drive.google.com/uc?id=1jnr2CYQ3TtM7vv8MBlYv3EtL-BZyc4nm"},
		{tag:"cafe", name: "Homemade Pasta with locally produced flour", image: "https://drive.google.com/uc?id=138zUpW1WPUoootY6d-2ACqTX0E_tfVAn"},
		{tag:"cafe", name: "One cake a day, keep bikini body away", image: "https://drive.google.com/uc?id=1_tLdFKLMkOKjzM6gF05lp80e5G0RDXx1"},
		{tag:"cafe", name: "Irresistible simple chocolate cake", image: "https://drive.google.com/uc?id=1WuYoLU4bx49jHSYBdW3stmyln0UMK7An"},
		{tag:"cafe", name: "New!!! Summer Fruit Jelly", image: "https://drive.google.com/uc?id=1cgd3OGcFWMQXc6KYb6BfARkhncRqXYf_"}
		
	]

var products = [
	{id: 1, order: 0, stock: 10, name: "Orange 350 Baht/Box" , price: "350" , image: "https://drive.google.com/uc?id=1hxumjnYKtA1VBLFTL9DzFnYQK6d7xnti", 
	 att: "Designed by lifeforstock / Freepik"},
	{id: 2, order: 0, stock: 10, name: "Pineapple 250 Baht/Box" , price: "250", image: "https://drive.google.com/uc?id=1ZwUyqa3FX031JEC3-OkvuaJEqu3joa6l", 
	 att: "Designed by dashu83 / Freepik"},
	{id: 3, order: 0, stock: 10, name: "Strawberry 350 Baht/Box" , price: "350", image: "https://drive.google.com/uc?id=1K3EnYKdYhKgb48K6AxBLn42zkvVweBZi", 
	 att: "Designed by Valeria_Aksakova / Freepik"},
	{id: 4, order: 0, stock: 10, name: "Grape: Red and White 260 Baht/Box" , price: "260", image: "https://drive.google.com/uc?id=1QczPdwI5N20E1tOAGOTspbEt_Xkse0OU", att: "Designed by jannoon028 / Freepik"},
	{id: 5, order: 0, stock: 10, name: "Low Sugar Jam 180 Baht/Jar" , price: "180", image: "https://drive.google.com/uc?id=1baSrjgrGyqr8idGlg80QQEw_bcgxCRPL", 
	 att: "Designed by Freepik"},
	{id: 6, order: 0, stock: 10, name: "Sun-Dried Raisin 350 Baht/Pack" , price: "350", image: "https://drive.google.com/uc?id=1nnTQBMh4FxWKGgX1D8YL5lmbSAw7jsMW", att: "Designed by topntp26 / Freepik"},
	{id: 7, order: 0, stock: 10, name: "Organic Wine 800 Baht/Bottle" , price: "800", image: "https://drive.google.com/uc?id=1O9gHsKzsQsUXFPaL7hpFFkGQLI98qZc1", 
	 att: "Designed by Freepik"},
	{id: 8, order: 0, stock: 10, name: "Mixed Rice 250 Baht/Pack" , price: "250", image: "https://drive.google.com/uc?id=1C_JlQZW_thZP_1eQjQluSTcqTJUgnWsy", 
	 att: "Designed by rawpixel.com / Freepik"},
	{id: 9, order: 0, stock: 10, name: "Heart-Shaped Herb Extract 2,000 Baht/Bottle" , price: "2000",image: "https://drive.google.com/uc?id=1hYyub2xL9lJp7amCld6sVcpnJc_tGWNK", att: "Designed by Freepik"}
]

app.get("/", function(req,res){
	res.render("landing.ejs");
});

app.get("/mypoint", function(req,res){
	res.render("mypoint.ejs");
});

app.get("/sunshine", function(req,res){
	res.render("home.ejs", {home_image:home_image});
});

app.get("/farm", function(req,res){
	var farm_map = {name:"Map", image: "https://drive.google.com/uc?id=16o1xgaJBcjtVGf82JKKwH7VQ22ixge9u"}
	res.render("farm.ejs", {farm_map:farm_map});
});

app.get("/cafe", function(req,res){
	res.render("cafe.ejs", {home_image:home_image});
});

app.get("/onlineorder", function(req,res){
	res.render("onlineorder.ejs", {products:products});
});

app.get("/visit", function(req,res){
	res.render("visit.ejs");
});

app.get("/review", function(req,res){
	Review.find({},function(err, ListOfReview){
		if(err){
			console.log("Something went wrong");
		}else{
			res.render("review/review.ejs", {review_image:ListOfReview});
		}
		
	});
	//res.render("review/review.ejs");
});

//Review's Index
app.post("/review", function(req,res){
	//get and create new review
	var star = req.body.star;
	var image = req.body.image;
	var reviewTitle = req.body.reviewTitle;
	var review = req.body.review;
	
	var newReview = {star:star,image:image, reviewTitle:reviewTitle, review:review};
	
	Review.create(newReview, function(err,createItem){
		if(err){
			console.log(err);
		}else{
			res.redirect("/review");
		}
	});
	
});

// Create new review
app.get("/review/new", function(req,res){
	res.render("review/new.ejs");
});

//Show more detail about review
app.get("/review/:id", function(req,res){
	
	Review.findById(req.params.id).populate("comments").exec(function(err, theReview){
		if(err){
			console.log(err);
		}else{
			res.render("review/show.ejs", {review:theReview});
		}
	});
	
});

// Comment section
app.get("/review/:id/comment/new", function(req,res){
	
	Review.findById(req.params.id, function(err, theReview){
		if(err){
			console.log(err);
		}else{
			res.render("comment/new.ejs", {review:theReview});
		}
	});
	
});

app.post("/review/:id/comment", function(req,res){
	Review.findById(req.params.id, function(err,theReview){
		if(err){
			console.log(err);
			res.redirect("/review");
		}else{
			Comment.create(req.body.comments, function(err,theComment){
				if(err){
					console.log(err);
				}else{
					theReview.comments.push(theComment);
					theReview.save();
					res.redirect("/review/"+review._id);
				}
			});
			
		}
	});
	
});



app.get("/signup", function(req,res){
	res.render("signup.ejs");
});

app.get("/login", function(req,res){
	res.render("login.ejs");
});

const port = process.env.PORT || 3000;

app.listen(port, process.env.IP, function(){
});