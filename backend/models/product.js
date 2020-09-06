const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and model

const ProductEntitySchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    brand: String,
    gender: String,
    availableSizes: String,
    characteristics: String
});

const ProductEntity = mongoose.model('productEntity', ProductEntitySchema);

module.exports = ProductEntity;