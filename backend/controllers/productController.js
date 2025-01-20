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
    // products.push(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// PUT to update a product
// exports.updateProduct = async (req, res) => {
//   try {
//     const productIndex = products.findIndex((p) => p.id === req.params.id);
//     if (productIndex !== -1) {
//       products[productIndex] = { id: req.params.id, ...req.body };
//       res.json(products[productIndex]);
//     } else {
//       res.status(404).send('Product not found');
//     }
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// };


// DELETE a product
// exports.deleteProduct = async (req, res) => {
//   try {
//     const productIndex = products.findIndex((p) => p.id === req.params.id);
//     if (productIndex !== -1) {
//       products.splice(productIndex, 1);
//       res.status(204).send();
//     } else {
//       res.status(404).send('Product not found');
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
