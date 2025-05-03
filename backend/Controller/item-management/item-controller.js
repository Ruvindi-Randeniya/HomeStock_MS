const Item = require('../../Model/item-management/item-model');

// Create an Item
exports.createItem = async (req, res) => {
    try {
        const { name, category, subCategory, quantity, expireDate } = req.body;
        const newItem = new Item({ name, category, subCategory, quantity, expireDate });
        console.log("New item before save:", newItem); // Debug: Inspect newItem
        await newItem.save();
        console.log("New item after save:", newItem); // Debug: Inspect newItem after save

        // Populate category and subCategory in a single call
        const populatedItem = await Item.findById(newItem._id)
            .populate([
                { path: 'category', select: 'categoryname' },
                { path: 'subCategory', select: 'subCategoryName' }
            ]);

        if (!populatedItem) {
            throw new Error("Failed to populate item");
        }

        res.status(201).json({ success: true, message: "Item added successfully", data: populatedItem });
    } catch (error) {
        console.error("Error in createItem:", error); // Debug: Log full error
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get all Items
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find()
            .populate('category', 'categoryname')
            .populate('subCategory', 'subCategoryName');
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get single Item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate('category', 'categoryname')
            .populate('subCategory', 'subCategoryName');
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
        const { name, category, subCategory, quantity, expireDate } = req.body;
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { name, category, subCategory, quantity, expireDate },
            { new: true, runValidators: true }
        ).populate('category', 'categoryname')
         .populate('subCategory', 'subCategoryName');

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

exports.getExpiringItems = async (req, res) => {
    try {
        const today = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(today.getDate() + 7);

        // Only get items that expire between today and 7 days from now
        const items = await Item.find({
            expireDate: {
                $gte: today,  // Greater than or equal to today (not expired)
                $lte: sevenDaysLater
            }
        }).sort({ expireDate: 1 });  // Sort by nearest expiration date first

        res.status(200).json({
            success: true,
            data: items,
            message: items.length > 0
                ? "Expiring items retrieved successfully"
                : "No items expiring in the next 7 days"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Get items expiring within 14 days
exports.getItemsExpiringSoon = async (req, res) => {
    try {
        const today = new Date();
        const fourteenDaysLater = new Date();
        fourteenDaysLater.setDate(today.getDate() + 14);

        // Get items that expire between today and 14 days from now
        const items = await Item.find({
            expireDate: {
                $gte: today,  // Greater than or equal to today
                $lte: fourteenDaysLater
            }
        }).sort({ expireDate: 1 });  // Sort by nearest expiration date first

        res.status(200).json({
            success: true,
            data: items,
            message: items.length > 0
                ? "Items expiring within 14 days retrieved successfully"
                : "No items expiring in the next 14 days"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get already expired items
exports.getExpiredItems = async (req, res) => {
    try {
        const today = new Date();

        // Get items where expireDate is less than today (already expired)
        const items = await Item.find({
            expireDate: {
                $lt: today
            }
        }).sort({ expireDate: 1 });  // Sort by expiration date

        res.status(200).json({
            success: true,
            data: items,
            message: items.length > 0
                ? "Expired items retrieved successfully"
                : "No expired items found"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = exports;