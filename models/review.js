var mongoose = require("mongoose");
// There could be several comment for one review 
var reviewSchema = new mongoose.Schema({
	star: String,
	image:String,
	imageId: String,
	reviewTitle:String,
	reviewContent:String,
	author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Review",reviewSchema);