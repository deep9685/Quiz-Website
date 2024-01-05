const express = require("express");
const router = express.Router();
const path = require('path');
const signupController = require("../controllers/signupController");



// Define a route handler for checking email availability
router.get('/check-email/:email',signupController.checkEmailAvailability);

// Define a route handler for checking password match
router.get('/check-password-match', signupController.checkPasswordMatch);

// Define a route handler for checking password match
router.post('/register', signupController.registerUser);

module.exports = router;