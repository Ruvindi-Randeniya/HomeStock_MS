const express = require("express");
const router = express.Router();
const multer = require("multer");
const subCategory = require("../../model/category-management/subcategory-model");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
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

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed"), false);
        }
        cb(null, true);
    },
}).single("subCategoryImage");

// Test route
router.get("/test", (req, res) => res.send("Sub-Category routes working"));

router.post("/", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: "File upload failed", error: err.message });
        }
        try {
            const { categoryID, subCategoryID, subCategoryName, date } = req.body;
            const subCategoryImage = req.file ? req.file.path.replace(/\\/g, "/") : null;

            // Check for duplicate subCategoryID
            const existingSubCategory = await subCategory.findOne({ subCategoryID });
            if (existingSubCategory) {
                return res.status(400).json({ msg: "Subcategory ID already exists" });
            }

            // Parse date
            const parsedDate = new Date(date);
            if (isNaN(parsedDate)) {
                return res.status(400).json({ msg: "Invalid date format" });
            }

            const newSubCategory = new subCategory({
                categoryID,
                subCategoryID,
                subCategoryName,
                subCategoryImage,
                date: parsedDate,
            });

            await newSubCategory.save();
            res.status(201).json({ msg: "Subcategory added successfully" });
        } catch (error) {
            console.error("Error while adding subcategory:", error);
            res.status(500).json({ msg: "Subcategory adding failed", error: error.message, stack: error.stack });
        }
    });
});

// Other routes (with fixed syntax)
router.get("/", (req, res) => {
    subCategory
        .find()
        .then((subcategories) => res.json(subcategories))
        .catch(() => res.status(400).json({ msg: "No Sub-categories found" }));
});

router.get("/:id", (req, res) => {
    subCategory
        .findById(req.params.id)
        .then((subcategories) => res.json(subcategories))
        .catch(() => res.status(400).json({ msg: "Cannot find this sub-category" }));
});

router.put("/:id", (req, res) => {
    subCategory
        .findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: "Update Successfully" }))
        .catch(() => res.status(400).json({ msg: "Update failed" }));
});

router.delete("/:id", (req, res) => {
    subCategory
        .findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted Successfully" }))
        .catch(() => res.status(400).json({ msg: "Cannot be Deleted" }));
});

module.exports = router;