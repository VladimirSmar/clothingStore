const mongoose = require('mongoose');
const ProductEntity = require('./product');
const Schema = mongoose.Schema;

// Create Schema and model

const UserEntitySchema = new Schema({
    email: String,
    password: String,
    cartProducts: Array,
    favoriteProducts: Array
});

const UserEntity = mongoose.model('userEntity', UserEntitySchema);

module.exports = UserEntity;