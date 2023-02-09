require('dotenv').config({path: './.env.development'});
const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routes/items");
const basketRouter = require("./routes/basket");
const batchOrdersRouter = require("./routes/batchOrders");
const bakersRouter = require("./routes/bakers");
const usersRouter = require("./routes/users");
const JWT = require("jsonwebtoken");
const tokensRouter = require("./routes/tokens");

const PORT = process.env.PORT || 3001;
const app = express();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ds0ycgm.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {
  let token;
  const authHeader = req.get("Authorization");

  if (authHeader) {
    token = authHeader.slice(7);
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "auth error" });
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
app.use(express.json())
app.use("/items", itemsRouter);
// app.use("/orders",tokenChecker,ordersRouter);
app.use("/orders",basketRouter);
app.use("/batchOrders", batchOrdersRouter);
app.use("/bakers", bakersRouter);
app.use("/users", usersRouter);
app.use("/tokens", tokensRouter);


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


app.get("/api", (req, res) => {
    res.json({ message: "Hello from Expressingssi!" });
  });

module.exports = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
