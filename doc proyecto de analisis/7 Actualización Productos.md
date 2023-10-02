### 1. Agregar Productos:

1. **Modelo de Producto**:
   
   Si aún no lo has hecho, crea un archivo `models/Product.js`:

   ```javascript
   const mongoose = require('mongoose');

   const ProductSchema = new mongoose.Schema({
       name: {
           type: String,
           required: true
       },
       description: String,
       price: {
           type: Number,
           required: true
       },
       image: String  // URL o path de la imagen del producto
   });

   module.exports = mongoose.model('Product', ProductSchema);
   ```

2. **Rutas para Productos**:

   En un nuevo archivo `routes/products.js`:

   ```javascript
   const express = require('express');
   const Product = require('../models/Product');
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

   module.exports = router;
   ```

3. **Integrar en app.js**:
   
   No olvides agregar las rutas de productos en tu archivo principal `app.js`:

   ```javascript
   const productRoutes = require('./routes/products');

   app.use('/products', productRoutes);
   ```

### 2. Interfaz para Productos:

1. **Página de Productos**:
   
   Puedes agregar una vista `views/products.ejs` para mostrar los productos:

   ```html
   <% products.forEach(product => { %>
       <div>
           <h2><%= product.name %></h2>
           <img src="<%= product.image %>" alt="<%= product.name %>">
           <p><%= product.description %></p>
           <p>Price: $<%= product.price %></p>
           <button>Add to Cart</button>
       </div>
   <% }) %>
   ```

2. **Controlador para Mostrar Productos**:

   Modifica `routes/products.js` para renderizar la vista con los productos:

   ```javascript
   router.get('/list', async (req, res) => {
       try {
           const products = await Product.find();
           res.render('products', { products });
       } catch (err) {
           res.status(400).send('Error fetching products');
       }
   });
   ```