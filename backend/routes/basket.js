const express = require("express");
const router = express.Router();

const BasketController = require("../controllers/basket");
const Basket = require("../models/basket");

router.get("/filled/:orderID", BasketController.getOrderByIDFilled);
router.post("/addToBasket/:userID", BasketController.addToBasket);
router.get("/getBatch/:batchID", BasketController.getBatch);
router.get("/getBasketInfo/:orderID", BasketController.getBasketInfoByID);
router.put("/update/totalPrice/:order_id", BasketController.updateOrderPrice);
router.post("/placeOrder", BasketController.placeOrder);

module.exports = router;
