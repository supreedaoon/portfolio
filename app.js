var express = require("express")
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

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

// var review_image = [
// 	{type: "visit", star: "5", image: "", review: "Best expereice for family"},
// 	{type: "visit", star: "4", iamge: "", review: "The farm was so nice but the cafe was understaff"},
// 	{type: "visit", star: "5", image: "", review: "I love my iced-coffee"}
// ]

app.get("/", function(req,res){
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
	res.render("review.ejs");
});

app.post("review", function(req,res){
	res.send("You hit the post route");
});

app.get("/review/new", function(req,res){
	res.render("new.ejs");
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