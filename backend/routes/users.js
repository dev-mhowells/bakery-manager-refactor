const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.create);
router.get("/getInvoice/:userId", UsersController.getInvoice);

module.exports = router;
