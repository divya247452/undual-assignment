import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js'
import Product from './models/productModel.js'
import cors from 'cors'
import path from'path';
dotenv.config()
const port = process.env.PORT || 5000;
connectDb()
const app = express();
app.use(express.json())
app.use(cors());


app.get('/api/products', async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const { filter, search } = req.query;   
        const regexFilter = filter ? new RegExp(filter, 'i') : null;     
        const regexSearch = search ? new RegExp(search, 'i') : null;     

        const query = {};
        if (regexFilter) query.category = { $regex: regexFilter };
        if (regexSearch) query.title = { $regex: regexSearch };
        const count = await Product.find(query).countDocuments()
        const products = await Product.find(query).limit(pageSize).skip( pageSize * (page-1) );
      
        res.status(200).json({products, page, pages: Math.ceil(count / pageSize)});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:id', async(req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOne({_id:id});
        if (product) {
        res.status(200).json(product);
            
        } else {
            res.status(500).send('Failed to deliver')
        }
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
