const mongoose = require("mongoose");
const {ObjectId} = require('mongodb')
const Schema = mongoose.Schema;
const Item = require('./item')

const BasketSchema = new Schema({
  userId: String,
  companyName: { type: String },
  orders: [{type: ObjectId, ref: "BatchOrder"}],
  dateOfOrder: {type: String},
  dateRequired: {type: String},
  totalPrice: {type: Number},
});

// Export model
const Basket = mongoose.model("Basket", BasketSchema);

module.exports = Basket;

