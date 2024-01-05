const express = require("express");
const router = express.Router();
const path = require('path');

const loginController = require("../controllers/loginController");

// Define a route handler for login user
router.post('/dashboard', loginController.loginUser);

module.exports = router;