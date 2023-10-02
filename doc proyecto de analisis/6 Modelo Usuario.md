### 1. Autenticación básica:

1. **Modelo de Usuario**:
   
   Crea un archivo `models/User.js`.

   ```javascript
   const mongoose = require('mongoose');

   const UserSchema = new mongoose.Schema({
       username: {
           type: String,
           required: true,
           unique: true
       },
       password: {
           type: String,
           required: true
       }
   });

   module.exports = mongoose.model('User', UserSchema);
   ```

2. **Rutas de Autenticación**:

   En `routes/auth.js`:

   ```javascript
   const express = require('express');
   const User = require('../models/User');
   const router = express.Router();

   router.post('/register', async (req, res) => {
       const { username, password } = req.body;

       try {
           const user = new User({ username, password });
           await user.save();
           res.send('User registered!');
       } catch (err) {
           res.status(400).send('Error registering user');
       }
   });

   router.post('/login', async (req, res) => {
       const { username, password } = req.body;
       
       const user = await User.findOne({ username });
       if (!user || user.password !== password) {
           return res.status(400).send('Invalid credentials');
       }

       req.session.user = user;
       res.send('Logged in!');
   });

   module.exports = router;
   ```

   **Nota**: Esta es una autenticación muy básica y no es segura para la producción, ya que las contraseñas no están cifradas.

### 2. Visualización en Tiempo Real:

1. **Frontend**: Vamos a agregar un simple gráfico en tiempo real usando `Chart.js`.

   En `views/index.ejs`:

   ```html
   <!-- ... -->

   <canvas id="realTimeChart"></canvas>
   
   <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   <script>
   const ctx = document.getElementById('realTimeChart').getContext('2d');
   const chart = new Chart(ctx, {
       type: 'line',
       data: {
           labels: [],  // Tiempo
           datasets: [{
               label: 'Compras en tiempo real',
               data: [],  // Datos de compras
           }]
       }
   });

   const socket = io();
   socket.on('newPurchase', (data) => {
       if (chart.data.labels.length > 10) {
           chart.data.labels.shift();
           chart.data.datasets[0].data.shift();
       }
       
       chart.data.labels.push(data.time);
       chart.data.datasets[0].data.push(data.value);
       chart.update();
   });
   </script>
   ```

2. **Backend**: Cuando se realiza una compra, emite un evento con Socket.io.

   En el archivo `app.js` o donde gestionas tus rutas:

   ```javascript
   app.post('/purchase', (req, res) => {
       // Aquí gestionas la compra ...

       // Emitir el evento para la visualización en tiempo real
       const currentTime = new Date().toLocaleTimeString();
       io.emit('newPurchase', { time: currentTime, value: /*valor de la compra*/ });
       
       res.send('Purchase completed');
   });
   ```