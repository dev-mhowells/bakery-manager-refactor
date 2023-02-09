const User = require("../models/user");
const Order = require("../models/basket");

const UsersController = {
  getAll: (req, res) => {
    console.log("GET ORDERS")
    User.find(async (err, users) => {
      if (err) {
        console.log(err)
        throw err;
      }
      console.log("orders:", users)
      res.status(200).json({ users:  users });
    });
  },
  Create: (req, res) => {
    //Create a new basket for the user
    const newBasket = new Order ({companyName: req.body.companyName, order: [], dateOfOrder:"", dateRequired :""})
    newBasket.save(async (err) => {
      if (err) {
        throw err;
      }
    })
      
    console.log("NEW BASKET ID: ", )
    const user = new User({
      companyName: req.body.companyName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phoneNumber: req.body.phone_number,
      typeOfBusiness: req.body.typeOfBusiness,
      currentBasketID: newBasket._id
    });

    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" })
      }
    });
  },
  getUserByID: async (req, res) => {
    const filter = { _id: req.params.userID };
    const user = await User.findById(filter)
    res.status(200).json(user)
  },
  updateUserBasket: async (req,res) => {
    // creates new order with companyName as ref to user?
    const newBasket = new Order ({companyName: req.body.companyName, order: [], dateOfOrder: "", dateRequired : ""})
    newBasket.save(async (err) => {
      if (err) {
        throw err;
      }
    })

    const userID = req.params.userID
    // find, update and respond with user with new currentBasket
    const filter = { _id: userID};
    await User.findByIdAndUpdate(userID,  { currentBasketID: newBasket._id });
    const user = await User.find(filter)
    res.status(202).json(user)
    },
  // Delete: (req, res) => {
  //   const email = req.body.email
  //   try {
  //   const user = User.findOne({ email })
  //   user.remove()
  //   res.status(200).json({ message: 'User successfully deleted.' })
  //   } catch (error) {
  //   res.status(400).json({ message: error.message })
  //   }
  //   }
};

module.exports = UsersController;