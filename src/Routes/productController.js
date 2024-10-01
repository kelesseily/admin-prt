const productModel = require('../Models/Product.js');
const { default: mongoose } = require('mongoose');

const createProduct = async(req,res) => {
   try {
      const newProduct = new productModel({ ...req.body });
      await newProduct.save();
      res.status(201).json(newProduct);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

module.exports = { createProduct };
