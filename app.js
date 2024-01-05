const express = require("express");
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const signupRoutes = require("./routes/signupRoute");
const loginRoutes = require("./routes/loginRoute")
const quizRoutes = require("./routes/quizRoute")
const app = express();
const port = 8080;

app.use(express.static('public'));
app.use('/css', express.static(__dirname+'public/css'));
app.use('/js', express.static(__dirname+'public/js'));
app.use('/img', express.static(__dirname+'public/img'));

// Assuming your CSS file is in the 'public/css' folder
app.use('/quiz', express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'public')));



// Use cors middleware to allow requests from your front-end origin
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'coding',
  resave: false,
  saveUninitialized: true,
  cookie:{
    secure: false,  // Set to true in production with HTTPS
    maxAge: 3600000 // Session timeout in milliseconds
  }
}));

// Define middleware function to check user session
const checkSession = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated, allow them to proceed
    next();
  } else {
    // User is not authenticated, redirect them to the login page or send an error message
    res.redirect('/login'); // Adjust the URL according to your setup
    // Alternatively, you can send an error message
    // res.status(401).send('Unauthorized');
  }
};




//Set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req,res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('index.ejs');
});

app.get('/signup', (req,res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('signup.ejs');
});

app.get('/login', (req,res) => {
    // res.sendFile(__dirname + '/views/index.html');
    res.render('login.ejs');
});

app.get('/contact', (req,res) => {
  res.render('contactpage.ejs');
});

app.get('/about', (req,res) => {
  res.render('aboutpage.ejs');
});

// app.get('/quiz/1', (req,res) => {
//   res.render('Quizpage.ejs');
// });

// Use the signupRoutes for handling signup-related routes
app.use('/signup', signupRoutes);

app.use('/login', loginRoutes);

// You can also apply the middleware for all routes
app.use(checkSession);

app.get('/welcome', (req,res) => {

  const user = req.session.user;
  res.render('welcome.ejs',{user});
});

app.use('/quiz', quizRoutes);

// Logout route
app.get('/logout', (req, res) => {
  // Clear the user session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      // Redirect to the login page or send a message indicating successful logout
      res.redirect('/'); // Adjust the URL according to your setup
      // Alternatively, you can send a message
      // res.send('Logout successful');
    }
  });
});

//listen on port
app.listen(port, () => {
    console.log(`listening to port ${port}`);
  });