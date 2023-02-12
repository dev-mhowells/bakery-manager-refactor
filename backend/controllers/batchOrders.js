const BatchOrder = require("../models/BatchOrder");

const BatchOrdersController = {
  getAll: async (req, res) => {
    const allBatchOrders = await BatchOrder.find();
    console.log("orders:", allBatchOrders);
    res.status(200).json(allBatchOrders);
  },
};

module.exports = BatchOrdersController;
