const mongoose = require("mongoose");
const {ObjectId} = require('mongodb')
const Schema = mongoose.Schema;
const Item = require('../models/item')

const OrderSchema = new Schema({
  userId: String,
  companyName: { type: String },
  orders: [{type: ObjectId, ref: "BatchOrder"}],
  dateOfOrder: {type: String},
  dateRequired: {type: String},
  totalPrice: {type: Number},
});

// Export model
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

