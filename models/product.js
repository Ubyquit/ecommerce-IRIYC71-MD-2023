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
