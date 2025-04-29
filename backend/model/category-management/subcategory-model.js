const mongoose = require("mongoose")

const SubCategorySchema = new mongoose.Schema({
    categoryID: {
        type : String,
        required : true,
    },
    subCategoryID: {
        type : String,
        required : true,
    },
    subCategoryName: {
        type : String,
        required : true,
    },
    subCategoryImage: {
        type : String,
        required : true,
    },
    date: {
        type : String, 
        required : true,
    }
})

module.exports = SubCategory = mongoose.model("SubCategory",SubCategorySchema)