const Item = require('../../Model/item-management/item-model');

// Create an Item
exports.createItem = async (req, res) => {
    try {
        const { name, category, subCategory, quantity, expireDate } = req.body;  // Updated to 'subCategory'
        const newItem = new Item({ name, category, subCategory, quantity, expireDate });  // Updated to 'subCategory'
        await newItem.save();
        res.status(201).json({ success: true, message: "Item added successfully", data: newItem });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all Items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get single Item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update an Item
exports.updateItem = async (req, res) => {
    try {
        const { category, subCategory, quantity, expireDate } = req.body;  // Updated to 'subCategory'
        const item = await Item.findByIdAndUpdate(req.params.id, { category, subCategory, quantity, expireDate }, { new: true, runValidators: true });  // Updated to 'subCategory'
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, message: "Item updated successfully", data: item });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete an Item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
