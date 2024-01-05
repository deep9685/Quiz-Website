const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const cors = require('cors');

//setting up database connection
const db = mysql.createConnection({
    host:"127.0.0.2",
    user:"root",
    database:"Quiz",
    password:"Deep@123",
});

const loginUser = (req,res) => {
    const {email, password} = req.body;

    //now checking email and password against database
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if(err) throw err;

        if(result.length > 0)
        {
            const user = result[0];
            // console.log(password);
            // console.log(user.password);
            bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
                // if(bcryptErr) throw bcryptErr;
                
                if(bcryptResult)
                {
                    // Set user session
                    // req.session.user = {
                    //     gmail : 'email'
                    // };
                    req.session.user = email;
                    const user = req.session.user;
                    //    res.send('Login Successfull.'); 
                    // res.send('Welcome to the dashboard, ' + req.session.user + '!');
                    res.render('welcome.ejs',{user});
                }
                else
                {
                    // res.send('Incorrect Password.');
                    res.redirect('/login');
                }
            });
        }
        else
        {
            res.send('User not found.');
        }
    });
};

module.exports = {
    loginUser,
};