const express = require ("express");
const { register, login , updateUser , deleteUser} = require("../../Controllers/user-management/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;