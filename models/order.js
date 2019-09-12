var mongoose = require("mongoose");
 
var orderSchema = new mongoose.Schema({
	itemIndex: Number,
    itemName: String,
	itemPrice: Number
});
 
module.exports = mongoose.model("Order", orderSchema);