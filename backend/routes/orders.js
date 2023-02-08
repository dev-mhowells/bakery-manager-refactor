const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/orders");
const Order = require("../models/order");

router.get("/", OrdersController.getAll);
// router.post("/", OrdersController.createOrder);
// router.get("/:orderID", OrdersController.getOrderByID)
router.get("/filled/:orderID", OrdersController.getOrderByIDFilled)
router.post("/addBatch/:orderID", OrdersController.addBatch);
router.get("/getBatch/:batchID", OrdersController.getBatch);
router.get("/getBasketInfo/:orderID", OrdersController.getBasketInfoByID);
router.delete("/delete/batch/:batchID", OrdersController.deleteBatchByID)
// router.patch("/update/batch/:batchID", OrdersController.updateBasketByBatchID)
router.post("/update/:order_id", OrdersController.updateOrder);
router.put("/update/totalPrice/:order_id", OrdersController.updateOrderPrice);





module.exports = router;
