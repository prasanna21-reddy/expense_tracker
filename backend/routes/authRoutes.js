const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
    updateProfile,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPassword);
router.put("/update-profile/:id", updateProfile);
module.exports = router;