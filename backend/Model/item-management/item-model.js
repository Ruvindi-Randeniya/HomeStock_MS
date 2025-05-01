const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',   // Reference to Category model
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
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
