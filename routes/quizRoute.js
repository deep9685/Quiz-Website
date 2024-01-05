const express = require("express");
const router = express.Router();
const path = require('path');
const quizController = require("../controllers/quizController");

// send req to get questions and options
router.get('/:quizId',quizController.LoadQuizpage);

//send post req to go to next page
router.post('/next',quizController.LoadNextQuestion);

module.exports = router;