document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Fetch form data
    const formData = new FormData(signupForm);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    // Send user data to the server for processing
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => Promise.reject(data));
        }
      })
      .then((data) => {
        console.log(data); // Handle successful signup response
        alert("Signup successful! You can now log in.");
        window.location.href = "login.html"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.message === "Email already exists") {
          alert("Email already in use. Please use a different email.");
        } else {
          alert("Signup failed. Please try again.");
        }
      });
  });
});
