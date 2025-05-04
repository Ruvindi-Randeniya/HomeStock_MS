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
        required: false,
    },
    date: {
        type: Date,
        default: Date,
    }
});

module.exports = mongoose.model("Category", CategorySchema);