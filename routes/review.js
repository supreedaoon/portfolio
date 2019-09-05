var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var Comment = require('../models/comment');
var middleware = require('../middleware');
//var request = require("request");
var multer = require('multer');

var storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

var imageFilter = function(req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require('cloudinary');

if (!process.env.DATABASEURL) {
    var config = require('../resources/private.js');
    cloudinary.config({
        cloud_name: config.local_cloud_name,
        api_key: config.local_api_key,
        api_secret: config.local_api_secret
    });
} else {
	cloudinary.config({
        cloud_name: process.env.cloudinary_cloud_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret
    });
}

//main review
router.get('/review', function(req, res) {
    Review.find({}, function(err, ListOfReview) {
        if (err) {
            console.log('Something went wrong');
        } else {
            res.render('review/review.ejs', { review_image: ListOfReview });
        }
    });
});

//handle new review
router.post('/review', middleware.isLoggedIn, upload.single('image'), function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/review');
        }
        var star = req.body.star;
        var image = result.secure_url;
        var imageId = result.public_id;
        var reviewTitle = req.body.reviewTitle;
        var reviewContent = req.body.reviewContent;
        var author = {
            id: req.user._id,
            username: req.user.username
        };
        var newReview = {
            star: star,
            image: image,
            imageId: imageId,
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
            author: author
        };

        Review.create(newReview, function(err, campground) {
            if (err) {
                req.flash('error', err.message);
                return res.redirect('/review');
            }
            res.redirect('/review');
        });
    });
});

//Form to create new review
router.get('/review/new', middleware.isLoggedIn, function(req, res) {
    res.render('review/new.ejs');
});

//Show more detail about a review
router.get('/review/:id', function(req, res) {
    Review.findById(req.params.id)
        .populate('comments')
        .exec(function(err, theReview) {
            if (err || !theReview) {
                //console.log(err);
                req.flash('error', 'Sorry, the review does not exist!');
                return res.redirect('/review');
            } else {
                res.render('review/show.ejs', { review: theReview });
            }
        });
});

//Form to edit review
router.get('/review/:id/edit', middleware.isLoggedIn, middleware.checkReviewOwnership, function(
    req,
    res
) {
    Review.findById(req.params.id, function(err, foundReview) {
        res.render('review/edit.ejs', { review: foundReview });
    });
});

//Handle updated review
router.put('/review/:id', middleware.checkReviewOwnership, upload.single('image'), function(
    req,
    res
) {
    Review.findById(req.params.id, async function(err, updateReview) {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
            if (req.file) {
                try {
                    //get new image
                    await cloudinary.v2.uploader.destroy(updateReview.imageId);
                    var result = await cloudinary.v2.uploader.upload(req.file.path);
                    updateReview.imageId = result.public_id;
                    updateReview.image = result.secure_url;
                } catch (err) {
                    req.flash('error', err.message);
                    return res.redirect('back');
                }
            }
            updateReview.star = req.body.star;
            updateReview.reviewTitle = req.body.reviewTitle;
            updateReview.reviewContent = req.body.reviewContent;
            updateReview.save();
            req.flash('success', 'Review Successfully Updated!');
            res.redirect('/review/' + updateReview._id);
        }
    });
});

//Delete Review
router.delete('/review/:id', middleware.checkReviewOwnership, function(req, res) {
    Review.findById(req.params.id, async function(err, foundReview) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/review');
        }
        try {
            await cloudinary.v2.uploader.destroy(foundReview.imageId);

            Comment.deleteMany({ _id: { $in: foundReview.comments } }, err => {
                if (err) {
                    console.log(err);
                    res.redirect('/review');
                }
            });

            foundReview.remove();
            req.flash('success', 'Review was deleted successfully!');
            res.redirect('/review');
        } catch (err) {
            if (err) {
                console.log('Problem here');
                req.flash('error', err.message);
                return res.redirect('/review');
            }
        }
    });
});

module.exports = router;