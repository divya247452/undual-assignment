import dotenv from 'dotenv';
import { products } from './data/products.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    // Map the products to ensure correct structure
    const sampleProducts = products.map((product) => {
      return { ...product };
    });

    // Insert products into the database
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all products
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Command-line argument handling
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
