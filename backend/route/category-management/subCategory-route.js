const express = require("express")
const router = express.Router()
const multer = require('multer')
const subCategory = require('../../model/category-management/subcategory-model')
const { route } = require("./category-route")

//test
router.get("/test", (req,res) => res.send("Sub-Category routes working"))

const path = require("path");

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


router.post("/", upload.single("subCategoryImage"), async (req, res) => {
    try {
        const { categoryID, subCategoryID, subCategoryName, date } = req.body;
        const subCategoryImage = req.file ? req.file.path.replace(/\\/g, "/") : null;

        const newSubCategory = new subCategory({
            categoryID,
            subCategoryID,
            subCategoryName,
            subCategoryImage,
            date,
        });

        await newSubCategory.save();
        res.status(201).json({ msg: "Subcategory added successfully" });
    } catch (error) {
        console.error("Error while adding subcategory:", error);
        res.status(500).json({ msg: "Subcategory adding failed", error: error.message });
    }
});

router.get("/", (req,res) =>{
    subCategory.find()
    .then((subcategories) => res.json(subcategories))
    .catch(() =>res.status(400).json({msg: "No Sub-categories found"}))
})

router.get("/:id", (req,res) =>{
    subCategory.findById(req.params.id)
    .then((subcategories) =>res.json(subcategories))
    .catch(() =>res.status(400).json({msg:"Cannot find this sub-category"}))
})

router.put("/:id", (req,res) =>{
    subCategory.findByIdAndUpdate(req.params.id, req.body)
    .then(() =>res.json({msg: " Update Successfully"})
    .catch(() => res.status(400).json({msg: "Update failed"})))
})

router.delete("/:id", (req,res) =>{
    subCategory.findByIdAndDelete(req.params.id)
    .then(() =>res.json({msg: "Deleted Successfully"})
    .catch(() => res.status(400).json({msg: "Cannot be Deleted"})))
})

module.exports = router