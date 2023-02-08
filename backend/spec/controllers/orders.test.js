const app = require("../../index");
const request = require("supertest");
const Order = require('../../models/order');
const Orders = require('../../controllers/orders')
const User = require('../../models/user');
const mongoose = require("mongoose");
require('dotenv').config({path: './.env.test'});


describe("updateOrder", () => {
  let req, res;
  beforeEach(() => {
    req = {
      user_id: mongoose.Types.ObjectId(),
      params: {
        order_id: mongoose.Types.ObjectId()
      },
      body: {
        date_required: ''
      }
    };
    res = {
      status: jest.fn().mockReturnValue({
        json: jest.fn()
      })
    };
  });

  // it("creates an order", async () => {
  //   const user = new User({ _id: req.user_id });
  //   await user.save();
  //   const order = new Order({
  //     _id: req.params.order_id,
  //     date_of_order: new Date(),
  //     date_required: '02/02/2023'
  //   });
  //   await order.save();

  //   await Orders.createOrder(req, res);
  //   expect(res.status).toHaveBeenCalledWith(201);
  //   expect(res.status().json).toHaveBeenCalledWith({
  //     message: "OK",
  //     token: expect.any(String)
  //   });
  //   const newOrder = await Order.findById(req.params.order_id);
  //   expect(updatedOrder.date_required).toEqual(req.body.orders);
  // });  
  it("updates an order", async () => {
    const user = new User({ _id: req.user_id });
    await user.save();
    const order = new Order({
      _id: req.params.order_id,
      dateOfOrder: new Date(),
      dateRequired: '02/02/2023'
    });
    await order.save();

    await Orders.updateOrder(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status().json).toHaveBeenCalledWith({
      message: "OK",
      token: expect.any(String)
    });
    const updatedOrder = await Order.findById(req.params.order_id);
    expect(updatedOrder.dateRequired).toEqual(req.body.dateRequired);
  });
});