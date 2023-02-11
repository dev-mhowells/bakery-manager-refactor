const BatchOrder = require("../models/BatchOrder");
const Basket = require("../models/basket");
// const TokenGenerator = require("../models/token_generator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Item = require("../models/item");

const BasketController = {
  getAll: (req, res) => {
    Basket.find({ userId: req.user_id }).exec((err, orders) => {
      // const token = TokenGenerator.jsonwebtoken(req.user_id);
      if (err) return res.status(400).send(err);
      res.status(200).json({ orders: orders, token: token });
    });
  },
  // createOrder: (req, res) => {
  //   User.find({_id: req.user_id }, function (err, docs)
  //   {
  //     if (err) {
  //       throw err;
  //     }
  //   })
  //   // console.log("POST ORDER")
  //   console.log(req.body)
  //   const order = new Order({userId: req.user_id, company: req.body.company, order: req.body.order
  //     // date_of_order: req.body.date_of_order, date_required: req.body.date_required
  //   });
  //   // console.log("NEW ORDER: ", order)
  //   order.save(async (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     Order.find(async (err, orders) => {
  //       if (err){
  //         throw err;
  //       }
  //       const token = await TokenGenerator.jsonwebtoken(req.user_id);
  //       res.status(201).json({ message: "OK", order: order, token: token});
  //     })

  //     // const allOrders = await Order.find()
  //     // res.status(201).json({Order: allOrders, token: token});
  //   }
  // )},
  // addBatch: async (req, res) => {
  //   // creates a batch
  //   const orderID = req.params.orderID
  //   const batchOrder = new BatchOrder(req.body);
  //   batchOrder.save();
  //   // adds a batch to the order passed in to params
  //   await Basket.findByIdAndUpdate(orderID, { $push: { orders: batchOrder } });

  //   res.status(201).json({batchOrder: batchOrder})
  // },
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

    res.status(201).json({ message: "ok" });
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
  // getOrderByID: async (req, res) => {
  //   const orderID = req.params.orderID;
  //   let order = await Order.findById(orderID)
  //   // console.log("ORDER:", order)
  //   res.status(200).json(order)

  // },
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
