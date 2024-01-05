document.addEventListener("DOMContentLoaded", function() {

    // Add event listener to the logout button
    document.getElementById("logoutButton").addEventListener("click", function() {
        // Navigate to the login page
        window.location.href = 'http://localhost:8080/logout';
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