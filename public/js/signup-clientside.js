const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");

togglePasswordButton.addEventListener("click", function () {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordButton.classList.remove("fa-eye-slash");
    togglePasswordButton.classList.add("fa-eye");
  } else {
    passwordInput.type = "password";
    togglePasswordButton.classList.remove("fa-eye");
    togglePasswordButton.classList.add("fa-eye-slash");
  }
});

const ConfirmpasswordInput = document.getElementById("confirm-password");
const togglePasswordButton2 = document.getElementById("togglePassword2");

togglePasswordButton2.addEventListener("click", function () {
  if (ConfirmpasswordInput.type === "password") {
    ConfirmpasswordInput.type = "text";
    togglePasswordButton2.classList.remove("fa-eye-slash");
    togglePasswordButton2.classList.add("fa-eye");
  } else {
    ConfirmpasswordInput.type = "password";
    togglePasswordButton2.classList.remove("fa-eye");
    togglePasswordButton2.classList.add("fa-eye-slash");
  }
});

// let nameInput = document.getElementById("name");
// console.log(nameInput);

//////////////client side name validation////////////////////////////

// Get references to the input field and error message element
const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");

// Add an event listener to the input field to check the name
nameInput.addEventListener("blur", () => {
  const name = nameInput.value.trim(); // Remove leading/trailing spaces

  // Create a regular expression pattern for a valid name (letters and spaces only)
  const namePattern = /^[A-Za-z ]+$/;

  // Check if the name matches the pattern
  if (!namePattern.test(name)) {
    nameError.textContent =
      "*Please enter a valid name with letters and spaces only.";
  } else {
    nameError.textContent = ""; // Clear any previous error message
  }
});

////////////////////////Client side email validation////////////////////////////////
// Get references to the input field and error message element
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");

// Add an event listener to the input field to check the email
emailInput.addEventListener("blur", () => {
  const email = emailInput.value.trim(); // Remove leading/trailing spaces

  // Create a regular expression pattern for a valid email format
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Check if the email matches the pattern
  if (!emailPattern.test(email)) {
    emailError.textContent = "*Please enter a valid email address.";
  } else {
    emailError.textContent = ""; // Clear any previous error message
  }
});

// server request to chek email is available or not
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const emailStatus = document.getElementById("email-error");

  emailInput.addEventListener("input", () => {
    const email = emailInput.value;
    console.log("hello");

    // Use the Fetch API to send a GET request to the email availability check route
    fetch("http://localhost:8080/signup/check-email/" + email)
      .then((response) => response.json())
      .then((data) => {
        const message = data.message;
        //   emailStatus.textContent = message;
        //   emailStatus.style.display = 'block';
        if (message != '') {
          alert(message);
          emailInput.value = ""; // Clear the email input field
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

//////////////////////////Client side password validation//////////////////////////
// Get references to the input field and error message element
const passwordInput2 = document.getElementById("password");
const passwordError = document.getElementById("password-error");

// Add an event listener to the input field to check the password
passwordInput2.addEventListener("blur", () => {
  const password = passwordInput2.value;

  // Check if the password meets specified criteria (e.g., minimum length and complexity)
  if (password.length < 8) {
    passwordError.textContent = "*Password must be at least 8 characters long.";
  } else if (!isStrongPassword(password)) {
    passwordError.textContent =
      "*Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  } else {
    passwordError.textContent = ""; // Clear any previous error message
  }
});

function isStrongPassword(password) {
  // Define a regular expression pattern for a strong password
  const strongPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return strongPasswordPattern.test(password);
}

//////////////////////////////////client side validation for confirm password/////////////////////////////////
// Get references to the password and confirm password input fields


//server request to check password === confirmPassword or not
// document.addEventListener("DOMContentLoaded", () => {
//     // const passwordInput = document.getElementById("password");
//     // const emailStatus = document.getElementById("email-error");
//         const passwordInput3 = document.getElementById("password");
//         const confirmPasswordInput = document.getElementById("confirm-password");
//         const confirmPasswordError = document.getElementById("confirm-password-error");
  
//     confirmPasswordInput.addEventListener("input", () => {
        
        
//         // Add an event listener to the "Confirm Password" input field
//         // confirmPasswordInput.addEventListener("blur", () => {
//           const password = passwordInput3.value;
//           const confirmPassword = confirmPasswordInput.value;
        
//           // Check if the "Confirm Password" matches the "Password"
//           if (password !== confirmPassword) {
//             confirmPasswordError.textContent = "Passwords do not match.";
//           } else {
//             confirmPasswordError.textContent = ""; // Clear any previous error message
//           }
//         // });
        
//     });
//   });

// const passwordInput = document.getElementById("password");
const confirmPasswordError = document.getElementById("confirm-password-error");
const confirmPasswordInput = document.getElementById("confirm-password");

confirmPasswordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  fetch(`http://localhost:8080/signup/check-password-match?password=${password}&confirmPassword=${confirmPassword}`)
    .then((response) => response.json())
    .then((data) => {
      const message = data.message;
      
      if (message != '') {
        confirmPasswordError.textContent = message;
        confirmPasswordError.style.display = "block";
      }
      else{
        confirmPasswordError.textContent = '';
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


/////////////////////////signup button ///////////////////////////////////////////
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('form#registrationForm');
//   const signupButton = document.getElementById('signupButton');

//   // Function to check if there are any error messages present
//   function areErrorsPresent() {
//     const errorMessages = form.querySelectorAll('.error-message');
//     for (const errorMessage of errorMessages) {
//       if (errorMessage.textContent.trim() !== '') {
//         return true; // Error message is not empty
//       }
//     }
//     return false; // No error messages found
//   }

//   // Function to update the "Sign Up" button's disabled attribute
//   function updateSignupButton() {
//     signupButton.disabled = areErrorsPresent();
//   }

//   // Attach an input event listener to the form element to handle dynamic changes
//   form.addEventListener('input', updateSignupButton);
// });


