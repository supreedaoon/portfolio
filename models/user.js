var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// one user can have several online order
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
	isAdmin: {type: Boolean, default: false},
	orders: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Order"
      }
   ]
});

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);