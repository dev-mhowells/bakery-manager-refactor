const express = require("express");
const router = express.Router();

const BasketController = require("../controllers/basket");
const Basket = require("../models/basket");

router.get("/", BasketController.getAll);
// router.post("/", OrdersController.createOrder);
// router.get("/:orderID", OrdersController.getOrderByID)
router.get("/filled/:orderID", BasketController.getOrderByIDFilled)
router.post("/addToBasket/:userID", BasketController.addToBasket)
router.post("/updateBasket/:userID", BasketController.updateBasket)
// router.post("/addBatch/:orderID", BasketController.addBatch);
router.get("/getBatch/:batchID", BasketController.getBatch);
router.get("/getBasketInfo/:orderID", BasketController.getBasketInfoByID);
router.delete("/delete/batch/:batchID", BasketController.deleteBatchByID)
// router.patch("/update/batch/:batchID", OrdersController.updateBasketByBatchID)
router.post("/update/:order_id", BasketController.updateOrder);
router.put("/update/totalPrice/:order_id", BasketController.updateOrderPrice);





module.exports = router;
