var express = require("express");
var router  = express.Router();
var Review = require("../models/review");



router.get("/review", function(req,res){
	Review.find({},function(err, ListOfReview){
		if(err){
			console.log("Something went wrong");
		}else{
			res.render("review/review.ejs", {review_image:ListOfReview});
		}
		
	});
});


router.post("/review", isLoggedIn, function(req,res){
	//get and create new review
	var star = req.body.star;
	var image = req.body.image;
	var reviewTitle = req.body.reviewTitle;
	var review = req.body.review;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
	
	var newReview = {star:star,image:image, reviewTitle:reviewTitle, review:review, author:author};
	
	Review.create(newReview, function(err,createItem){
		if(err){
			console.log(err);
		}else{
			res.redirect("/review");
		}
	});
	
});

// Create new review
router.get("/review/new", isLoggedIn, function(req,res){
	res.render("review/new.ejs");
});

//Show more detail about review
router.get("/review/:id", function(req,res){
	
	Review.findById(req.params.id).populate("comments").exec(function(err, theReview){
		if(err){
			console.log(err);
		}else{
			res.render("review/show.ejs", {review:theReview});
		}
	});
	
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
