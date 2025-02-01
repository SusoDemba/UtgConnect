const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../uploads/upload'); 
const mongoose=require("mongoose")








// Get all products
// authenticateToken
router.get('/',  async (req, res) => {

  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
// it was authorise byt admin oly





router.post('/',upload.single('image'), async (req, res) => {

 

  try {

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.file ? req.file.filename : null // Save filename
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product by ID
router.put('/:id',  async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
      },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product by ID
// ::contentReference[oaicite:0]{index=0}

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  console.log("Received delete request for ID:", req.params.id); // Debugging

  if (!req.params.id) {
    return res.status(400).json({ message: "Product ID is missing!" });
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product ID format!" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.use('/uploads', express.static('backend/upload'));

module.exports = router;
