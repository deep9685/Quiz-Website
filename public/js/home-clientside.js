// home.js
document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the Signup button
    // document.getElementById("signupButton").addEventListener("click", function() {
    // //     // Navigate to the signup page
    // //     window.location.href = "signuppage.html";
    // // Make an HTTP GET request to the signup route
    // fetch('http://localhost:8081/signup/')
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.text();
    //   })
    //   .then(responseText => {
    //     // Assuming the response contains HTML for the signup page
    //     document.body.innerHTML = responseText;
    //   })
    //   .catch(error => {
    //     console.error('There was a problem with the fetch operation:', error);
    //   });
    // });

    //  // Add event listener to the home link
    // document.getElementById("signupButton").addEventListener("click", function() {
    //     // Navigate to the signup route
    //     window.location.href = 'http://localhost:8080/signup';
    // });

    //  // Add event listener to the Signup button
     document.getElementById("signupButton").addEventListener("click", function() {
        // Navigate to the signup route
        window.location.href = 'http://localhost:8080/signup';
    });

    // Add event listener to the Login button
    document.getElementById("loginButton").addEventListener("click", function() {
        // Navigate to the login page
        window.location.href = 'http://localhost:8080/login';
    });

       // Add event listener to the Back to Quizzes button
       document.getElementById("hero-button").addEventListener("click", function () {
        // Navigate to the welcome page
        window.location.href = "http://localhost:8080/welcome"; // Replace with the actual URL of your welcome page
    });

    // Add event listener to the Back to Quizzes button
    document.getElementById("view-more").addEventListener("click", function () {
        // Navigate to the welcome page
        window.location.href = "http://localhost:8080/welcome"; // Replace with the actual URL of your welcome page
    });

    // Get all elements with the class "quiz-container"
    const quizContainers = document.querySelectorAll('.quiz-container');


    // Add a click event listener to each container
    quizContainers.forEach((container) => {
        container.addEventListener('click', () => {
            // Get the quizId from the data-quiz-id attribute
            const quizId = container.getAttribute('data-quiz-id');

            // Send a request to the /quiz/:quizId route
            fetch(`/quiz/${quizId}`)
                .then((response) => {
                    if (response.ok) {
                        // Parse the HTML content from the response
                        return response.text();
                    } else {
                        console.error('Error sending request');
                        throw new Error('Error sending request');
                    }
                })
                .then((htmlContent) => {
                    // Display the HTML content on the page
                    document.body.innerHTML = htmlContent;
                })
                .catch((error) => {
                    console.error('Network error:', error);
                });
        });
    });
});
