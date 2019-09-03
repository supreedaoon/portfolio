var express = require("express");
var router  = express.Router({mergeParams: true});
var Review	= require("../models/review");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//create new comment //we don't have SHOW page exclusively for comments
router.get("/review/:id/comment/new", middleware.isLoggedIn, function(req,res){
	
	Review.findById(req.params.id, function(err, theReview){
		if(err){
			console.log(err);
		}else{
			res.render("comment/new.ejs", {review:theReview});
		}
	});
	
});

//handle new comment
router.post('/review/:id/comment', middleware.isLoggedIn, function(req, res) {
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

//Form to edit cooment
router.get("/review/:id/comment/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
		  Review.findById(req.params.id,function(err,foundReview){
			   res.render("comment/edit.ejs", {review:foundReview, comment: foundComment});
		  });
       
      }
   });
});

//Handle updated comment
router.put("/review/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/review/" + req.params.id );
      }
   });
});

//Delete Comment
router.delete("/review/:id/comment/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/review/" + req.params.id);
       }
    });
});

module.exports = router;