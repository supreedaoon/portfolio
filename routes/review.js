var express = require('express');
var router = express.Router();
var Review = require('../models/review');
var Comment = require('../models/comment');
var middleware = require('../middleware');
var multer = require('multer');

// handle image upload
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

// handle confidential variable for Cloudinary
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

//Show all reviews
router.get('/review', function(req, res) {
    Review.find({}, function(err, ListOfReview) {
        if (err) {
            console.log('Something went wrong');
        } else {
            res.render('review/review.ejs', { review_image: ListOfReview });
        }
    });
});

// *********** Content filter stop working with review since implementation of Cloudinary
// *********** Suspect: Async cause problem 
//handle new review and upload image
// Always check if user is logged-in
// router.post('/review', middleware.isLoggedIn, upload.single('image'), function(req, res) {
//     cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
//         if (err) {
//             req.flash('error', err.message);
//             return res.redirect('/review');
//         }
//         var star = req.body.star;
// // 		get information from cloudinary
//         var image = result.secure_url;
//         var imageId = result.public_id;
//         var reviewTitle = req.body.reviewTitle;
//         var reviewContent = req.body.reviewContent;
//         var author = {
//             id: req.user._id,
//             username: req.user.username
//         };
//         var newReview = {
//             star: star,
//             image: image,
//             imageId: imageId,
//             reviewTitle: reviewTitle,
//             reviewContent: reviewContent,
//             author: author
//         };

//         Review.create(newReview, function(err, campground) {
//             if (err) {
//                 req.flash('error', err.message);
//                 return res.redirect('/review');
//             }
//             res.redirect('/review');
//         });
//     });
// });

//Form to create new review
// Always check if user is logged-in
// router.get('/review/new', middleware.isLoggedIn, function(req, res) {
//     res.render('review/new.ejs');
// });

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
//Check if user is logged-in and owns the review
router.get('/review/:id/edit', middleware.isLoggedIn, middleware.checkReviewOwnership, function(
    req,
    res
) {
    Review.findById(req.params.id, function(err, foundReview) {
        res.render('review/edit.ejs', { review: foundReview });
    });
});

//Handle updated review
//Check if user owns the review
router.put('/review/:id', middleware.checkReviewOwnership, upload.single('image'), function(req, res) {
    Review.findById(req.params.id, async function(err, updateReview) {
        if (err) {
            req.flash('error', err.message);
            res.redirect('back');
        } else {
// 			check if new image is uploaded
            if (req.file) {
                try {
                    //remove old image from cloudinary 
                    await cloudinary.v2.uploader.destroy(updateReview.imageId);
// 					upload new image in cloudinary
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

//Delete a Review
//Check if user owns the review
router.delete('/review/:id', middleware.checkReviewOwnership, function(req, res) {
    Review.findById(req.params.id, async function(err, foundReview) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/review');
        }
        try {
// 			remove image from Cloudinary
            await cloudinary.v2.uploader.destroy(foundReview.imageId);
// 			Delete comments related to this review
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
                console.log('Problem occured during image, comment removing');
                req.flash('error', err.message);
                return res.redirect('/review');
            }
        }
    });
});

module.exports = router;