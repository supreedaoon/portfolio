var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
	star: String,
	image:String,
	reviewTitle:String,
	review:String,
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Review",reviewSchema);