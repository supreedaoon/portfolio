var express = require("express");
var router  = express.Router();
var Review = require("../models/review");
var middleware = require("../middleware");


//main review
router.get("/", function(req,res){
	Review.find({},function(err, ListOfReview){
		if(err){
			console.log("Something went wrong");
		}else{
			res.render("review/review.ejs", {review_image:ListOfReview});
		}
		
	});
});

//handle new review
router.post("/", middleware.isLoggedIn, function(req,res){
	//get and create new review
	var star = req.body.star;
	var image = req.body.image;
	var reviewTitle = req.body.reviewTitle;
	var reviewContent = req.body.reviewContent;
	var author = {
        id: req.user._id,
        username: req.user.username
    }
	
	var newReview = {star:star,image:image, reviewTitle:reviewTitle, reviewContent:reviewContent, author:author};
	
	Review.create(newReview, function(err,createItem){
		if(err){
			console.log(err);
		}else{
			res.redirect("/review");
		}
	});
	
});

//Form to create new review
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("review/new.ejs");
});

//Show more detail about a review
router.get("/:id", function(req,res){
	
	Review.findById(req.params.id).populate("comments").exec(function(err, theReview){
		if(err){
			console.log(err);
		}else{
			res.render("review/show.ejs", {review:theReview});
		}
	});
	
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkReviewOwnership, function(req, res){
    Review.findById(req.params.id, function(err, foundReview){
        res.render("review/edit.ejs", {review: foundReview});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkReviewOwnership, function(req, res){
    // find and update the correct campground
	Review.findByIdAndUpdate(req.params.id, req.body.review, function(err, updatedReview){
       if(err){
           res.redirect("/review");
       } else {
           //redirect somewhere(show page)
           res.redirect("/review/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkReviewOwnership, function(req, res){
   Review.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/review");
      } else {
          res.redirect("/review");
      }
   });
});

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }

module.exports = router;
