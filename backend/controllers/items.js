const Item = require("../models/item");

const ItemsController = {
  getAll: (req, res) => {
    Item.find(async (err, items) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ items: items });
    });
  },

  createItem: (req, res) => {
    const item = new Item(req.body);

    item.save(async (err) => {
      if (err) {
        throw err;
      }
      const allItems = await Item.find();
      res.status(201).json({ items: allItems });
    });
  },

  deleteItem: async (req, res) => {
    await Item.deleteOne({ _id: req.body.id });
    const newItems = await Item.find();
    res.status(201).json({ items: newItems });
  },

  editItem: async (req, res) => {
    await Item.findByIdAndUpdate(req.body.id, {
      ...req.body.updatedItem,
    });
    const newItems = await Item.find();
    res.status(201).json({ items: newItems });
  },
};

module.exports = ItemsController;
