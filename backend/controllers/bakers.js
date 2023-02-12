const { restart } = require("nodemon");
const Baker = require("../models/baker");

const BakersController = {
  getAll: (req, res, next) => {
    // console.log("GET CONFIRMED ORDERS")
    try {
      Baker.find((err, orders) => {
        if (err) throw err;
        console.log("Confirmed Orders:", orders);
        res.status(200).json({ confirmedOrder: orders });
      });
    } catch (err) {
      console.error("Error retrieving confirmed orders", err);
      res.status(500).json({ message: "Error retrieving confirmed orders" });
    }
  },

  getBakerById: (req, res, next) => {
    try {
      const baker = Baker.findById(req.params.id);
      if (baker == null) {
        return res.status(404).json({ message: "Cannot find order" });
      }
      res.baker = baker;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createBaker: (req, res) => {
    console.log("POST Baker");
    const baker = new Baker(req.body);
    console.log("NEW Baker: ", baker);
    baker.save(async (err) => {
      if (err) {
        throw err;
      }
      const allBakers = await Baker.find();
      res.status(201).json({ bakers: allBakers });
    });
  },
  getOrders: async (req, res) => {
    // hardcoded BakerId because app currently has only one admin/baker
    const BakerId = "63e7da7df62bd6b74d2cfe96";
    // populate confirmedOrders arr in Baker, and orders arr inside confirmedOrders
    const baker = await Baker.findOne({ _id: BakerId })
      .populate({
        path: "confirmedOrders",
        populate: {
          path: "orders",
        },
      })
      .exec();
    console.log("FILLED BAKER", baker);

    res.status(201).json({ confirmedOrders: baker.confirmedOrders });
  },
};

module.exports = BakersController;
