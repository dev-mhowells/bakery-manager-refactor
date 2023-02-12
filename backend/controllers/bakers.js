const Baker = require("../models/baker");

const BakersController = {
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

    res.status(201).json({ confirmedOrders: baker.confirmedOrders });
  },
};

module.exports = BakersController;
