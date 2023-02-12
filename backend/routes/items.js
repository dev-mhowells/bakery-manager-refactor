const express = require("express");
const router = express.Router();

const ItemsController = require("../controllers/items");

router.get("/", ItemsController.getAll);
router.post("/", ItemsController.createItem);
router.post("/deleteItem", ItemsController.deleteItem);
router.post("/editItem", ItemsController.editItem);

module.exports = router;
