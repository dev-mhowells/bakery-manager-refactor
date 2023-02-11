const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

const BakerSchema = new Schema({
  confirmedOrder: { type: Array },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  confirmedOrders: [{ type: ObjectId, ref: "Basket" }],
});

// Export model
const Baker = mongoose.model("Baker", BakerSchema);

module.exports = Baker;
