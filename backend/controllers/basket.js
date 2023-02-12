const BatchOrder = require("../models/BatchOrder");
const Basket = require("../models/basket");
const Baker = require("../models/baker");
// const TokenGenerator = require("../models/token_generator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Item = require("../models/item");
const { findByIdAndUpdate } = require("../models/item");

const BasketController = {
  getAll: (req, res) => {
    Basket.find({ userId: req.user_id }).exec((err, orders) => {
      // const token = TokenGenerator.jsonwebtoken(req.user_id);
      if (err) return res.status(400).send(err);
      res.status(200).json({ orders: orders, token: token });
    });
  },
  placeOrder: async (req, res) => {
    // hardcoded BakerId because app currently has only one admin/baker
    const BakerId = "63e7da7df62bd6b74d2cfe96";
    const baker = await Baker.findById(BakerId);

    const userId = req.body.userId;
    const user = await User.findById(userId);

    const basketId = user.currentBasketID;
    const basket = await Basket.findById(basketId).populate("orders").exec();

    const newBasket = new Basket({
      companyName: basket.companyName,
      orders: basket.orders,
      dateOfOrder: basket.dateOfOrder,
      dateRequired: basket.dateRequired,
      totalPrice: basket.totalPrice,
    });

    await newBasket.save();

    // add the confirmed order to the Baker
    await Baker.updateOne(
      { _id: BakerId },
      { $addToSet: { confirmedOrders: newBasket } }
    );
    // clear basket for user
    await Basket.findByIdAndUpdate(basketId, {
      orders: [],
      dateOfOrder: "",
      dateRequired: "",
      totalPrice: 0,
    });
    res.status(200).json({ message: "ok" });
  },
  addToBasket: async (req, res) => {
    // gets user's basketId
    const userID = req.params.userID;
    const user = await User.findById(userID);
    const basketID = user.currentBasketID;

    // finds the user's basket and fills orders
    const basket = await Basket.findById(basketID).populate("orders").exec();
    const allOrders = basket.orders;
    // gets the item name to check against
    const incomingItem = req.body.itemName;
    // is there an item with incomingItem name in basket?
    const orderToUpdate = allOrders.filter(
      (order) => order.itemName === incomingItem
    );

    const update = async () => {
      // if no: create, else edit the item in the basket
      if (orderToUpdate.length === 0) {
        // check a batchQuantity has been selected, if not, return
        // stops users from being able to add an item with 0 batchQuantity to basket
        if (req.body.batchQuantity === 0) return;
        // creates batch with body
        const batchOrder = new BatchOrder(req.body);
        await batchOrder.save();
        await Basket.findByIdAndUpdate(basketID, {
          $push: { orders: batchOrder },
        });
      } else if (req.body.batchQuantity === 0) {
        // if user has removed all items of that name from basket, delete batchOrder
        await BatchOrder.findByIdAndDelete(orderToUpdate[0].id);
        // remove associated batchOrder from the user's basket
        await Basket.updateMany(
          { orders: orderToUpdate[0].id },
          { $pull: { orders: orderToUpdate[0].id } }
        );
      } else {
        // edit the order with the new quantity
        await BatchOrder.findByIdAndUpdate(orderToUpdate[0].id, {
          batchQuantity: req.body.batchQuantity,
        });
      }
    };

    await update();

    const newBasket = await Basket.findById(basketID).populate("orders").exec();
    res.status(201).json({ basket: newBasket });
  },
  updateBasket: async (req, res) => {
    const userID = req.params.userID;
    const user = await User.findById(userID);
  },
  getBatch: async (req, res) => {
    const filter = { _id: req.params.batchID };
    const batch = await BatchOrder.find(filter);
    // console.log("batch: ", batch)
    res.json(batch);
  },
  getBasketInfoByID: async (req, res) => {
    const filter = { _id: req.params.orderID };
    //Firstly filter the through the orders DB.
    //Then populate the variable 'batchOrders' with all in info in the orders field
    const batchOrders = await Basket.find(filter).populate("orders").exec();
    res.status(200).json(batchOrders);
  },
  getOrderByIDFilled: async (req, res) => {
    const orderID = req.params.orderID;
    let order = await Basket.findById(orderID).populate("orders").exec();
    console.log("ORDER:", order);
    res.status(200).json(order);
  },
  deleteBatchByID: async (req, res) => {
    const orderID = req.body.orderID;

    let order = await Basket.findById(orderID);
    // console.log("ORDER:", order)
    const filter = { _id: orderID };

    //Remove batch from the orders array in Order DB
    console.log("ORDER TO UPDATE: ", order);
    const previousBatchOrders = order.orders;
    console.log("PREVIOUS BATCH ORDERS", previousBatchOrders);
    const newBatchOrders = previousBatchOrders.remove(req.params.batchID);
    console.log("NEW BATCH ORDERS", newBatchOrders);
    const update = { orders: newBatchOrders };
    await Basket.findOneAndUpdate(filter, update);

    //Remove batch order from BatchOrder DB
    await BatchOrder.deleteOne({ _id: req.params.batchID });
    console.log("Batches in Order", order.orders);
    res.status(201).json(order);
  },

  // UPDATES ORDER WITH DATE ON CLICK CONFIRM
  updateOrder: async (req, res) => {
    const update = {
      dateOfOrder: new Date(),
      dateRequired: req.body.dateRequired,
    };

    // specifies that updated document should be returned
    // from operation below
    const options = { new: true };
    const order = await Basket.findByIdAndUpdate(
      req.params.order_id,
      update,
      options
    )
      .populate("orders")
      .exec();

    res.status(201).json({ order });
  },
  updateOrderPrice: async (req, res) => {
    const filter = { _id: req.params.order_id };
    const update = { totalPrice: req.body.totalPrice };
    await Basket.findByIdAndUpdate(req.params.order_id, update);
    const order = await Basket.find(filter);
    res.status(202).json(order);
  },
};

module.exports = BasketController;
