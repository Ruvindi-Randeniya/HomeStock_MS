const express = require("express");
const router = express.Router();
const multer = require('multer')
const Category = require("../../model/category-management/category"); // Make sure the path is correct

// Test route
router.get("/test", (req, res) => res.send("Category routes working"));

const path = require("path")
const fs = require("fs");

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });


router.post("/", upload.single("categoryImage"), async (req, res) => {
    try {
        const { categoryID, categoryName, date } = req.body;
        const categoryImage = req.file ? req.file.path : null;

        const newCategory = new category({
            categoryID,
            categoryName,
            categoryImage,
            date,
        });

        await newCategory.save();
        res.status(201).json({ msg: "Category added successfully" });
    } catch (error) {
        console.error("Error while adding Category:", error.message);
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