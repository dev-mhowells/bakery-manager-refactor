const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:userID", UsersController.getUserByID);

module.exports = router;
