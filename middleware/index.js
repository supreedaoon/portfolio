var Review = require("../models/review");
var Comment = require("../models/comment");
 
var middlewareObj = {};

// check ownership of review: return review only for owner or admin
middlewareObj.checkReviewOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Review.findById(req.params.id, function(err, foundReview){
           if(err || !foundReview){
			   req.flash('error', 'Sorry, the review does not exist');
               res.redirect("/review");
           }  else if(foundReview.author.id.equals(req.user._id) || req.user.isAdmin ) {
			   	req.review = foundReview;
                next();
            } else {
				 req.flash('error', 'You don\'t have permission to do that');
                res.redirect("/review/"+req.params.id);
            }
           // }
        });
    } else {
        res.redirect("/review");
    }
}

// check Comment ownership: return comment for owner or admin
middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
			   req.flash('error', 'Sorry, the comment does not exist!');
               res.redirect("/review");
           }  else if(foundComment.author.id.equals(req.user._id)|| req.user.isAdmin) {
			   req.comment = foundComment;
                next();
            } else {
				req.flash('error', 'You don\'t have permission to do edit/delete this comment');
                res.redirect("back");
            }
           
        });
    } else {
        res.redirect("/review");
    }
}

// check if user log-in or not and redirect. 
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
	req.flash("error", "Please sign in first");
    res.redirect("/login");
}

module.exports = middlewareObj;