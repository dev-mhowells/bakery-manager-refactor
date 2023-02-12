const BatchOrder = require("../models/BatchOrder");
const Basket = require("../models/basket");
const Baker = require("../models/baker");
// const TokenGenerator = require("../models/token_generator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Item = require("../models/item");
const { findByIdAndUpdate } = require("../models/item");

const BasketController = {
  placeOrder: async (req, res) => {
    // hardcoded BakerId because app currently has only one admin/baker
    const BakerId = "63e7da7df62bd6b74d2cfe96";
    const baker = await Baker.findById(BakerId);

    const userId = req.body.userId;
    const user = await User.findById(userId);

    const basketId = user.currentBasketID;
    const basket = await Basket.findById(basketId).populate("orders").exec();

    // basket associated with User will be reset, this creates a new basket with
    // the same order information and saves to DB
    const newBasket = new Basket({
      companyName: basket.companyName,
      orders: basket.orders,
      dateOfOrder: basket.dateOfOrder,
      dateRequired: basket.dateRequired,
      totalPrice: basket.totalPrice,
    });

    await newBasket.save();

    // add the confirmed order (newBasket) to the Baker
    await Baker.updateOne(
      { _id: BakerId },
      { $addToSet: { confirmedOrders: newBasket } }
    );
    // clear basket associated with user
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

  getBatch: async (req, res) => {
    const filter = { _id: req.params.batchID };
    const batch = await BatchOrder.find(filter);
    // console.log("batch: ", batch)
    res.json(batch);
  },

  // uses basket ID // rename - getBasketByUserId
  getBasketInfoByID: async (req, res) => {
    const userId = req.params.userId;
    console.log("this is the userId", userId);

    // const user = await User.findById(userId);
    const user = await User.findOne({ _id: userId });
    const basketID = user.currentBasketID;

    // finds the user's basket and fills orders
    const basket = await Basket.findById(basketID).populate("orders").exec();

    res.status(200).json(basket);
  },

  // uses basket ID
  getOrderByIDFilled: async (req, res) => {
    const orderID = req.params.orderID;
    let order = await Basket.findById(orderID).populate("orders").exec();
    console.log("ORDER:", order);
    res.status(200).json(order);
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
