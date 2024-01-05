const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const saltRounds = 10;


const connection = mysql.createConnection({
    host:"127.0.0.2",
    user:"root",
    database:"Quiz",
    password:"Deep@123"
});



const checkEmailAvailability = (req, res) => {
  const { email } = req.params;
  console.log("here");

  const q = "SELECT COUNT(0) AS userCount FROM users WHERE email = ?";
  connection.query(q, email, (err, results) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).json({ message: "Server error" });
    } else {
      const userCount = results[0]["userCount"];
      if (userCount === 1) {
        // Email is already registered
        res
          .status(200)
          .json({
            message:
              "Email is already registered. Please use a different email.",
          });
      } else {
        // Email is available
        res.status(200).json({ message: "" });
      }
    }
  });
};


const checkPasswordMatch = (req,res) => {
  const { password, confirmPassword } = req.query; // Assuming you send data as query parameters

  if (password === confirmPassword) {
    res.json({ message: '' });
  } else {
    res.status(400).json({ message: "Passwords do not match" });
  }
};


const registerUser = (req,res) => {
    const { name, email, password, confirmPassword } = req.body;

      //Hash the password and save the user in the database
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: "Error hashing password." });
        }

        // Save the user in the database with the hashed password
        //Inserting New Data for single user
        let q = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        let user = [name, email, hash];

        try {
          connection.query(q, user, (err, result) => {
            if (err) throw err;

            console.log(result);
            res.send(`Standard post request: Welcome ${name}`);
          });
        } catch (err) {
          console.log(err.sqlMessage);
        }

        
        //Don't forget to validate other fields and handle errors appropriately
      });

  // Continue with the registration process if everything is valid
};


module.exports = {
    checkEmailAvailability,
    checkPasswordMatch,
    registerUser,
};