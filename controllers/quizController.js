const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const saltRounds = 10;

const connection = mysql.createConnection({
  host: "127.0.0.2",
  user: "root",
  database: "Quiz",
  password: "Deep@123",
});

let correctAnswersCount = 0;

const LoadQuizpage = (req, res) => {
  correctAnswersCount = 0;
  const { quizId } = req.params;

  const sql1 = "select * from questions where quiz_id = ?";
  const sql2 = "select * from options where question_id = ?";

  connection.query(sql1, [quizId], (err, results) => {
    if (err) throw err;
    const questions = results; // Replace with your actual data
    // console.log(questions);
    const qid = questions[0].question_id;
    // console.log(qid);
    connection.query(sql2, [qid], (err, results) => {
      if (err) throw err;
      const options = results;

      // console.log(questions);
      // console.log(options);
      const user = req.session.user;
      console.log(user);

      res.render("Quizpage.ejs", {
        questions,
        options,
        currentQuestionIndex: 0,
        quizId,
        qid,
        user,
      });
    });
  });
};

const LoadNextQuestion = (req, res) => {
  const currentQuestionIndex = req.body.currentQuestionIndex || 0;
  const nextQuestionIndex = parseInt(currentQuestionIndex) + 1;
  const quizId = req.body.quizId;
  const qid = req.body.qid;
  const nextqid = parseInt(qid) + 1;
  const selectedOptionId = req.body.selectedOptionId;
  // const correctAnswer = req.body.correctAnswersCount;

  checkIfOptionIsCorrect(selectedOptionId, (err, result1) => {
    if (err) {
      console.error("Error:", err);
    } else {
      // console.log('Is correct:', result1);
      if (result1 === 1) {
        correctAnswersCount++;
        // console.log(correctAnswersCount);
      }
      // return result1;
    }
  });

  const sql1 = "select * from questions where quiz_id = ?";
  const sql2 = "select * from options where question_id = ?";

  connection.query(sql1, [quizId], (err, results) => {
    if (err) throw err;
    const questions = results; // Replace with your actual data

    connection.query(sql2, [nextqid], (err, results) => {
      if (err) throw err;
      const options = results;

      // console.log(questions);
      // console.log(options);
      const user = req.session.user;

      if (nextQuestionIndex < questions.length) {
        // Render the quiz page with the next question
        res.render("Quizpage.ejs", {
          questions,
          options,
          currentQuestionIndex: nextQuestionIndex,
          quizId,
          qid: nextqid,
          correctAnswersCount,
          user,
        });
        // console.log(nextQuestionIndex);
      } else {
        // Quiz completed, you can redirect to a completion page or display a message
        // res.redirect('/Quiz/completed');
        console.log("total count", correctAnswersCount);
        // res.send("Quiz Completed!");
        res.render('resultpage.ejs', {correctAnswersCount,user})
      }
    });
  });
};

function checkIfOptionIsCorrect(selectedOptionId, callback) {
  const sql3 = "select is_correct from options where option_id = ?";

  connection.query(sql3, [selectedOptionId], (err, results) => {
    if (err) {
      callback(err); // Pass the error to the callback
    } else {
      const ans = results[0].is_correct;
      callback(null, ans); // Pass the result to the callback
    }
  });
}

module.exports = {
  LoadQuizpage,
  LoadNextQuestion,
};
