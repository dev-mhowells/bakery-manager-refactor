const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  companyName: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: String },
  phone_number: { type: String },
  typeOfBusiness: { type: String },
  currentBasketID: { type: String },
  invoice: { type: Schema.Types.ObjectId, ref: "Basket" },
  role: { type: String, default: "customer" },
});

// Export model
const User = mongoose.model("User", UserSchema);

module.exports = User;
