const express = require("express");
const router = express.Router();

const BatchOrdersController = require("../controllers/batchOrders");

router.get("/getAll", BatchOrdersController.getAll);

module.exports = router;
