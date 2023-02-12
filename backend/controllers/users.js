const User = require("../models/user");
const Basket = require("../models/basket");

const UsersController = {
  Create: (req, res) => {
    //Create a new basket for the user
    const newBasket = new Basket({
      companyName: req.body.companyName,
      order: [],
      dateOfOrder: "",
      dateRequired: "",
    });
    newBasket.save(async (err) => {
      if (err) {
        throw err;
      }
    });

    const user = new User({
      companyName: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phone_number,
      typeOfBusiness: req.body.typeOfBusiness,
      currentBasketID: newBasket._id,
    });

    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },

  getUserByID: async (req, res) => {
    const filter = { _id: req.params.userID };
    const user = await User.findById(filter);
    res.status(200).json(user);
  },

  getInvoice: async (req, res) => {
    const userId = req.params.userId;

    const user = await User.findOne({ _id: userId })
      .populate({ path: "invoice", populate: { path: "orders" } })
      .exec();

    res.status(200).json(user.invoice);
  },
};

module.exports = UsersController;
