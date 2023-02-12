const express = require("express");
const router = express.Router();

const BasketController = require("../controllers/basket");
const Basket = require("../models/basket");

router.get("/filled/:orderID", BasketController.getOrderByIDFilled); // need to remove
router.post("/addToBasket/:userID", BasketController.addToBasket);
router.get("/getBasketInfo/:userId", BasketController.getBasketInfoByID);
router.put("/updateTotal/:userId", BasketController.updateTotal);
router.post("/placeOrder", BasketController.placeOrder);

module.exports = router;
