const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
        trim: true,
        validate: {
            validator: function (value) {
                return /[a-zA-Z]/.test(value); // Ensures at least one letter exists
            },
            message: "Item name must contain at least one letter"
        }
    },
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ["admin", "user"],
        default: "user"
    },

    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    expireDate: {
        type: Date,
        required: [true, "Expire date is required"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Expire date must be in the future"
        }
    },
   
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
