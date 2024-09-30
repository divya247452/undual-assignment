import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
  },
  images: {
    type: [String],
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  tags: {
    type: [String],
    required: true
  }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

export default Product;
