import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Product name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Product description is required'
  },
  price: {
    type: Number,
    required: 'Product price is required'
  },
  quantity: {
    type: Number,
    required: 'Product quantity is required'
  },
  category: {
    type: String,
    trim: true,
    required: 'Product category is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', ProductSchema);
