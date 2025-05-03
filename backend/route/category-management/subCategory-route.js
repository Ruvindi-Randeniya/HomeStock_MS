const express = require("express")

const router = express.Router()

const subCategory = require("../../Model/category-management/subcategory-model") // Make sure the path is correct
const { route } = require("./category-route")


//test
router.get("/test", (req,res) => res.send("Sub-Category routes working"))

router.post("/", (req,res) =>{
    subCategory.create(req.body)
    .then(() => res.json({msg: "Sub-Category added successfully"}))
    .catch(() => res.status(400).json({msg: "Sub-Category adding failed"}))
})

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