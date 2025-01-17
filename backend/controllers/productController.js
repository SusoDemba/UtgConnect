const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('owner', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const product = await Product.create({ ...req.body, owner: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
