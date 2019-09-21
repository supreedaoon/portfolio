var express 	= require("express");
var router  	= express.Router();
var passport 	= require("passport");
var User 		= require("../models/user");
var Order		= require("../models/order");
var middleware 	= require('../middleware');
var img 		= require('../public/resource.js');
const { check, validationResult } = require('express-validator');

// get list of image and description for resource file
var home_image = img.home_image;
var products = img.products;

//general routes
router.get("/", function(req,res){
	res.render("intro/landing.ejs");
});

router.get("/webstatus", function(req,res){
	res.render("intro/webstatus.ejs");
});

router.get("/mypoint", function(req,res){
	res.render("intro/mypoint.ejs");
});

router.get("/home", function(req,res){
	res.render("general/home.ejs", {home_image:home_image});
});

router.get("/farm", function(req,res){
	var farm_map = {name:"Map", image: "https://drive.google.com/uc?id=16o1xgaJBcjtVGf82JKKwH7VQ22ixge9u"}
	res.render("general/farm.ejs", {farm_map:farm_map});
});

router.get("/cafe", function(req,res){
	res.render("general/cafe.ejs", {home_image:home_image});
});

router.get("/visit", function(req,res){
	res.render("general/visit.ejs");
});

//Routes for online order
router.get("/onlineorder", function(req,res){
	res.render("onlineorder/onlineorder.ejs", {products:products});
});

// Always check if user is logged-in 
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

//Handle new order
// User must be logged-in to add item to cart
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

//Delete ALL item in order 
// Always check if user is logged-in
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

//delte one item in order list
// Always check if user is logged-in
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

//show information of one item 
router.get("/onlineorder/:index", function(req,res){
	res.render("onlineorder/show.ejs", {products:products, index:req.params.index});
});

//Routes for registration
// show register form
router.get("/signup", function(req, res){
   res.render("general/signup.ejs"); 
});

//handle registration
//use NPM-Express Valiadator to check validity of username & password 
//NPM-Passport handle authentification
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
           res.redirect("/home"); 
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
        successRedirect: "/home",
        failureRedirect: "/login",
		failureFlash: true
    }), function(req, res){
});

//Log-Out
router.get("/logout", function(req, res){
   req.logout();
	req.flash("success", "Signed out successfully");
   res.redirect("/home");
});


module.exports = router;