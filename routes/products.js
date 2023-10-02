const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Ruta para agregar un producto
router.post('/add', async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const product = new Product({ name, description, price, image });
        await product.save();
        res.send('Product added!');
    } catch (err) {
        res.status(400).send('Error adding product');
    }
});

// Ruta para listar todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(400).send('Error fetching products');
    }
});

router.get('/list', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (err) {
        res.status(400).send('Error fetching products');
    }
});


module.exports = router;
