const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    about: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true
    }
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;