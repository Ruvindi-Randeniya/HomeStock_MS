const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {  // Updated field name to match frontend
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
