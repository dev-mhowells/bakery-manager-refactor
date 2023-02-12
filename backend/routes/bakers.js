const express = require("express");
const router = express.Router();

const BakersController = require("../controllers/bakers");

router.get("/getOrders", BakersController.getOrders);

module.exports = router;
