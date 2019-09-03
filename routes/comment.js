var express = require("express");
var router  = express.Router({mergeParams: true});
var Review	= require("../models/review");
var Comment = require("../models/comment");

//create new comment //we don't have SHOW page exclusively for comments
router.get("/review/:id/comment/new", isLoggedIn, function(req,res){
	
	Review.findById(req.params.id, function(err, theReview){
		if(err){
			console.log(err);
		}else{
			res.render("comment/new.ejs", {review:theReview});
		}
	});
	
});

//handle new comment
router.post('/review/:id/comment', isLoggedIn, function(req, res) {
    Review.findById(req.params.id, function(err, theReview) {
        if (err) {
            console.log(err);
            res.redirect('/review');
        } else {
            Comment.create(req.body.comment, function(err, theComment) {
                if (err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    theComment.author.id = req.user._id;
                    theComment.author.username = req.user.username;
                    //save comment
                    theComment.save();
                    theReview.comments.push(theComment);
                    theReview.save();
                    res.redirect('/review/' + theReview._id);
                }
            });
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