const express = require("express")

const router = express.Router()

const Categories = require("../../model/category-management/category-model")

//test
router.get("/test", (req,res) => res.send("Category routes working"))

router.post("/", (req,res) =>{
    Categories.create(req.body)
    .then(()=> res.json({msg: "Category added successfully"}))
    .catch(() => res.status(400).json({msg: "Category adding failed"}))
})

router.get("/", (req,res) =>{
    Categories.find()
    .then((categories) => res.json(categories))
    .catch(() =>res.status(400).json({msg: "No categories found"}))
})

router.get("/:id", (req,res) =>{
    Categories.findById(req.params.id)
    .then((categories) =>res.json(categories))
    .catch(() =>res.status(400).json({msg: "Cannot find this category."}))
})

router.put("/:id", (req,res) =>{
    Categories.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({msg: "Update Successfully"})
    .catch(() => res.status(400).json({msg: "Update failed"})))
})

router.delete("/:id", (req,res) =>{
    Categories.findByIdAndDelete(req.params.id)
    .then(() =>res.json({msg: "Deleted Successfully"})
    .catch(() => res.status(400).json({msg: " Cannot be Deleted"})))
})


module.exports = router;