const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    categoryID: {
        type: String,
        required: true,
        unique: true,
    },
    categoryname: {
        type: String,
        required: true,
    },
    categoryImage: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Category", CategorySchema);