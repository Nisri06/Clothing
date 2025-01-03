document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => Promise.reject(data));
            }
        })
        .then(data => {
            console.log(data);
            alert('Login successful!');
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.message === 'Incorrect password') {
                alert('Incorrect password. Please try again.');
            } else if (error.message === 'User not found') {
                alert('User not found. Please register.');
                window.location.href = 'signup.html';
            } else {
                alert('Login failed. Please try again.');
            }
        });
    });
});
