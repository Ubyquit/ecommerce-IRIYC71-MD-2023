const express = require("express");
const mongoose = require("mongoose");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerceDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on("connection", (socket) => {
  console.log("Usuario conectado");

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });

  // Aquí puedes añadir más eventos según lo que quieras monitorizar.
});

// Configuración de EJS como motor de plantillas
app.set("view engine", "ejs");

// Rutas (ejemplo básico)
app.get("/", (req, res) => {
  res.render("index");
});

// app.js

const productRoutes = require("./routes/products");
app.use("/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
