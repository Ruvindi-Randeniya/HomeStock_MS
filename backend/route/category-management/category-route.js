const express = require("express");
const router = express.Router();
const Category = require("../../model/category-management/category"); // Make sure the path is correct

// Test route
router.get("/test", (req, res) => res.send("Category routes working"));

// Create a new category
router.post("/", async (req, res) => {
    console.log("Incoming POST request to /categories");
    console.log("Request body:", req.body);

    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        console.log("Category created successfully");
        res.status(201).json({ msg: "Category added successfully" });
    } catch (error) {
        console.error("Error while adding category:", error.message);
        res.status(400).json({ msg: "Category adding failed", error: error.message });
    }
});

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(400).json({ msg: "No categories found", error: error.message });
    }
});

// Get a category by ID
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ msg: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(400).json({ msg: "Cannot find this category.", error: error.message });
    }
});

// Update a category
router.put("/:id", async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Update successful" });
    } catch (error) {
        res.status(400).json({ msg: "Update failed", error: error.message });
    }
});

// Delete a category
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: "Cannot be deleted", error: error.message });
    }
});

module.exports = router;