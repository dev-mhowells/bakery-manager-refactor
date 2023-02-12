require("dotenv").config({ path: "./.env.development" });
const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routes/items");
const basketRouter = require("./routes/basket");
const batchOrdersRouter = require("./routes/batchOrders");
const bakersRouter = require("./routes/bakers");
const usersRouter = require("./routes/users");
const tokensRouter = require("./routes/tokens");

const PORT = process.env.PORT || 3001;
const app = express();

// Set up mongoose connection
mongoose.set("strictQuery", false);
// const mongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ds0ycgm.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const mongoDB = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.PASSWORD}@bakery-manager.fmzfczg.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// route setup
app.use(express.json());
app.use("/items", itemsRouter);
app.use("/orders", basketRouter);
// app.use("/batchOrders", batchOrdersRouter);
app.use("/bakers", bakersRouter);
app.use("/users", usersRouter);
app.use("/tokens", tokensRouter);

module.exports = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
