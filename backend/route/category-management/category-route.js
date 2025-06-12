const express = require("express");
const router = express.Router();
const multer = require('multer')
const Category = require("../../Model/category-management/category-model");
const path = require("path")
const fs = require("fs");

// Test route
router.get("/test", (req, res) => res.send("Category routes working"));

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
}).single("categoryImage");


router.post("/", (req, res) => {
    upload(req, res, async (err) => {
       if (err) {
                   console.error("Multer error:", err.message);
                   return res.status(400).json({ msg: "File upload failed", error: err.message });
               }
               try {
                   const { categoryID, categoryname, date } = req.body;
                   if (!req.file) {
                       return res.status(400).json({ msg: "No image file uploaded" });
                   }
                   const categoryImage = req.file.path.replace(/\\/g, "/");
                   console.log("Saved image path:", categoryImage);
       
                   const existingCategory = await Category.findOne({categoryID});
                   if(existingCategory){
                    return res.status(400).json({msg: "Category ID already exists"});
                   }
       
                   const parsedDate = new Date(date);
                   if (isNaN(parsedDate)) {
                       return res.status(400).json({ msg: "Invalid date format" });
                   }
       
                   const newCategory = new subCategory({
                       categoryID,
                       categoryname,
                       categoryImage,
                       date: parsedDate,
                   });
       
                   await newCategory.save();
                   res.status(201).json({ msg: "Category added successfully", path: categoryImage });
               } catch (error) {
                   console.error("Error while adding Category:", error.message);
                   res.status(500).json({ msg: "Category adding failed", error: error.message });
               }
    });
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
router.put("/:id", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: "File upload failed", error: err.message });
        }
        try {
            const { categoryID, categoryname, date } = req.body;
            const categoryImage = req.file ? req.file.path.replace(/\\/g, "/") : null;

            // Update category details
            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    categoryID,
                    categoryname,
                    categoryImage,
                    date: new Date(date),
                },
                { new: true }
            );

            if (!updatedCategory) {
                return res.status(404).json({ msg: "Category not found" });
            }

            res.json({ msg: "Update successful", updatedCategory });
        } catch (error) {
            console.error("Error while updating category:", error);
            res.status(500).json({ msg: "Update failed", error: error.message });
        }
    });
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