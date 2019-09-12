var express 	= require("express");
var router  	= express.Router();
var passport 	= require("passport");
var User 		= require("../models/user");
var Order		= require("../models/order");
var middleware 	= require('../middleware');

const { check, validationResult } = require('express-validator');

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
	{index: 0, order: 0, stock: 10, name: "Orange 350 Baht/Box" , price: "350" , image: "https://drive.google.com/uc?id=1hxumjnYKtA1VBLFTL9DzFnYQK6d7xnti", 
	 att: "Designed by lifeforstock / Freepik"},
	{index: 1, order: 0, stock: 10, name: "Pineapple 250 Baht/Box" , price: "250", image: "https://drive.google.com/uc?id=1ZwUyqa3FX031JEC3-OkvuaJEqu3joa6l", 
	 att: "Designed by dashu83 / Freepik"},
	{index: 2, order: 0, stock: 10, name: "Strawberry 350 Baht/Box" , price: "350", image: "https://drive.google.com/uc?id=1K3EnYKdYhKgb48K6AxBLn42zkvVweBZi", 
	 att: "Designed by Valeria_Aksakova / Freepik"},
	{index: 3, order: 0, stock: 10, name: "Grape: Red and White 260 Baht/Box" , price: "260", image: "https://drive.google.com/uc?id=1QczPdwI5N20E1tOAGOTspbEt_Xkse0OU", att: "Designed by jannoon028 / Freepik"},
	{index: 4, order: 0, stock: 10, name: "Low Sugar Jam 180 Baht/Jar" , price: "180", image: "https://drive.google.com/uc?id=1baSrjgrGyqr8idGlg80QQEw_bcgxCRPL", 
	 att: "Designed by Freepik"},
	{index: 5, order: 0, stock: 10, name: "Sun-Dried Raisin 350 Baht/Pack" , price: "350", image: "https://drive.google.com/uc?id=1nnTQBMh4FxWKGgX1D8YL5lmbSAw7jsMW", att: "Designed by topntp26 / Freepik"},
	{index: 6, order: 0, stock: 10, name: "Organic Wine 800 Baht/Bottle" , price: "800", image: "https://drive.google.com/uc?id=1O9gHsKzsQsUXFPaL7hpFFkGQLI98qZc1", 
	 att: "Designed by Freepik"},
	{index: 7, order: 0, stock: 10, name: "Mixed Rice 250 Baht/Pack" , price: "250", image: "https://drive.google.com/uc?id=1C_JlQZW_thZP_1eQjQluSTcqTJUgnWsy", 
	 att: "Designed by rawpixel.com / Freepik"},
	{index: 8, order: 0, stock: 10, name: "Heart-Shaped Herb Extract 2,000 Baht/Bottle" , price: "2000",image: "https://drive.google.com/uc?id=1hYyub2xL9lJp7amCld6sVcpnJc_tGWNK", att: "Designed by Freepik"}
]


router.get("/", function(req,res){
	res.render("intro/landing.ejs");
});

router.get("/webstatus", function(req,res){
	res.render("intro/webstatus.ejs");
});

router.get("/mypoint", function(req,res){
	res.render("intro/mypoint.ejs");
});

router.get("/sunshine", function(req,res){
	res.render("general/home.ejs", {home_image:home_image});
});

router.get("/farm", function(req,res){
	var farm_map = {name:"Map", image: "https://drive.google.com/uc?id=16o1xgaJBcjtVGf82JKKwH7VQ22ixge9u"}
	res.render("general/farm.ejs", {farm_map:farm_map});
});

router.get("/cafe", function(req,res){
	res.render("general/cafe.ejs", {home_image:home_image});
});

router.get("/onlineorder", function(req,res){
	res.render("onlineorder/onlineorder.ejs", {products:products});
});

router.get("/onlineorder/summary", middleware.isLoggedIn, function(req,res){
	
	//if possible: check if we can use req.user directly
	 User.findById(req.user._id)
	 .populate("orders")
	 .exec(function(err, user) {
	 if (err || !user) {
	 req.flash('error', 'Sorry, this user does not exist!');
	 return res.redirect('/onlineorder');
	 } else {
	 res.render('onlineorder/summary.ejs', { user: user });
	 }
	 });
	
	 
});

router.post("/onlineorder", middleware.isLoggedIn, function(req,res){
	var itemIndex = req.body.index;
			var itemName = products[parseInt(itemIndex)].name;
			var itemPrice = products[parseInt(itemIndex)].price;
			
            Order.create({itemIndex:itemIndex, itemName:itemName, itemPrice:itemPrice}, function(err, order) {
                if (err) {
                    console.log(err);
                } else {
                    
                   User.findById(req.user._id, function(err,user){
					user.orders.push(order);
                    user.save();
					res.redirect("onlineorder/summary");
				   });
					
                }
            });
});
router.delete("/onlineorder/orders", middleware.isLoggedIn, function(req, res){
    //findByIdAndRemove
	 User.findById(req.user._id, function(err, user){
		 Order.deleteMany({ _id: { $in: user.orders } }, err => {
                if (err) {
                    console.log(err);
                    res.redirect('/onlineorder');
                }
            });
		 res.redirect('/onlineorder/summary');
	 });
		
});

router.delete("/onlineorder/orders/:order_id", middleware.isLoggedIn, function(req, res){
    //findByIdAndRemove
    Order.findByIdAndRemove(req.params.order_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/onlineorder/summary");
       }
    });
});

router.get("/onlineorder/:index", function(req,res){
	res.render("onlineorder/show.ejs", {products:products, index:req.params.index});
});

router.get("/visit", function(req,res){
	res.render("general/visit.ejs");
});

// show register form
router.get("/signup", function(req, res){
   res.render("general/signup.ejs"); 
});
//handle sign up logic
router.post("/signup", [check('username')
  .isAlphanumeric()
  .isLength({ min: 1, max: 20 }), check('password')
  .isAlphanumeric()
  .isLength({ min: 1, max: 5 })], function(req, res){
	
    var newUser = new User({username: req.body.username});
	const errors = validationResult(req)
  if (!errors.isEmpty()) {
	  req.flash("error", "Invalid Username or Password");
    return res.redirect("/signup");
  }
	
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function(){
			 req.flash("success", "Successfully Signed Up! Welcome " + req.body.username + " to our community");
           res.redirect("/sunshine"); 
        });
    });
});

//Log-In form
router.get("/login", function(req, res){
   res.render("general/login.ejs"); 
});
//Handle Log-In Process
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/sunshine",
        failureRedirect: "/login",
		failureFlash: true
    }), function(req, res){
});

//Log-Out
router.get("/logout", function(req, res){
   req.logout();
	req.flash("success", "Signed out successfully");
   res.redirect("/sunshine");
});


module.exports = router;