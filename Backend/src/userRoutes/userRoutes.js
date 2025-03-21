const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const router = express.Router();

//Only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req,res) => {
    res.json({ message: "Welcome Admin"});
});

//Both admin and HouseholdOwner can access this router
router.get("/HouseholdOwner", verifyToken, authorizeRoles("admin" , "HouseholdOwner"), (req,res) => {
    res.json({ message: "Welcome HouseholdOwner"});
});

//All can access this router
router.get("/user", verifyToken, authorizeRoles("admin" , "HouseholdOwner", "user"),(req,res) => {
    res.json({ message: "Welcome User"});
});


module.exports = router;