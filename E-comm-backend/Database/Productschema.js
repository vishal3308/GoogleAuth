const mongoose = require('mongoose');

// ============Google Authentication===================

const ProductSchema = new mongoose.Schema({
    actualprice: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sellingprice: {
        type: Number,
        required: true
    },
    userid: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('product', ProductSchema);
