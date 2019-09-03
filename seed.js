var mongoose = require("mongoose");
var Review = require("./models/review");
var Comment   = require("./models/comment");
 
var data = [
    {
        star:"5",
		image: "https://drive.google.com/uc?id=1zQHFA3NbOqnS-zAWuUxIfrzNfUMjgMWZ",
		reviewTitle: "Best weekend activity for families with kids", 
        review:"We enjoy visiting this place every sunday morning and have a cup of coffe and a piece of cake there. The air was so fresh.",
		author:{username:"Alice"}
        
    },
    {
        star:"3",
		image: "https://drive.google.com/uc?id=1BaotcjchOtVHGx2quFmcyjRujATusrBR",
		reviewTitle: "The farm was nice but the cafe was understaffed", 
        review:"So many interesting things to see in farm but I had to wait 20 minutes for my lunch.",
		author:{username:"Leon"}
        
    },
    {
         star:"5",
		image: "https://drive.google.com/uc?id=1q1K7fxkVooxqFfJqi-jhBT0VzJxDAywO",
		reviewTitle: "Nice Coffee", 
        review:"Perfect coffee for my afternoon. (Plus heart-shaped herb extract!!!)",
		author:{username:"Claire"}
        
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Review.remove({}, function(err){
        if(err){
            console.log(err);
        }
        // console.log("removed ALL review!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            // console.log("removed ALL comments!");
             //add a few review
            data.forEach(function(seed){
                Review.create(seed, function(err, review){
                    if(err){
                        console.log(err)
                    } else {
                        // console.log("added a review");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: {username:"Homer"} 
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    review.comments.push(comment);
                                    review.save();
                                    // console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;