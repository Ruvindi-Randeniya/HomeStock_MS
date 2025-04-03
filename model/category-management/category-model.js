const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    categoryID: {
        type : String,
        required: true,
    },
    categoryname: {
        type : String,
        required: true,
    },
    categoryImage :{
        type: String,
        required: true,
    },
    date :{
        type: String,
        required: true,
    }

})

module.exports = Category = mongoose.model("category", CategorySchema)