import Product from '../models/product.models.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({
      message: "Product created successfully!"
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

const getProductById = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .exec()
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateFields = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.set(updateFields);
    product.updated = Date.now();
    await product.save();
    res.json({message: 'Product updated'});
    
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      error: 'Error updating the product'
    });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(deletedProduct);
  } catch (err) {
    return res.status(400).json({
      error: "Error deleting the product",
    });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    // Delete all products from your database
    const result = await Product.deleteMany({});
    if (result.deletedCount > 0) {
      res.json({ message: 'All products deleted successfully' });
    } else {
      res.json({ message: 'No products found to delete' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const findProductsByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing name parameter' });
    }

    const products = await Product.find({
      name: { $regex: new RegExp(name, 'i') },
    });

    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found with the given name' });
    }

    const productNames = products.map((product) => product.name);
    res.json(productNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export default {
  createProduct,
  getProductById,
  getAllProducts,
  deleteProduct,
  deleteAllProducts,
  updateProduct,
  findProductsByName
};
