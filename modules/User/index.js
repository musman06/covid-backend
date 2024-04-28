const express = require("express");
const router = express.Router();
const authController = require("./controller");
const { isUserLoggedIn } = require("../Middlewares/utils");

// User routes
router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post("/change-password", isUserLoggedIn, authController.changePassword);
router.get("/get-all-stats", isUserLoggedIn, authController.getAllStats);

module.exports = router;
