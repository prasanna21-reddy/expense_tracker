const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  updateProfile,
  updateAllowance,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/forgot-password", forgotPassword);
router.put("/update-profile/:id", updateProfile);
router.put("/update-allowance/:id", updateAllowance);
module.exports = router;


