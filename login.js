// Login form handler
function handleLogin(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Clear previous messages
    clearMessages();

    // Validation
    if (username.length < 3) {
        showError('usernameError', 'Username must be at least 3 characters');
        return;
    }

    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        return;
    }

    // Simulate authentication (replace with actual API call)
    authenticateUser(username, password, rememberMe);
}

function authenticateUser(username, password, rememberMe) {
    // Simulate API call with a delay
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Demo credentials
    const validUsers = {
        'admin': 'password123',
        'user': 'user1234',
        'demo': 'demo123'
    };

    if (validUsers[username] && validUsers[username] === password) {
        // Successful login
        successMessage.style.display = 'block';
        successMessage.textContent = '✓ Login successful! Redirecting...';

        // Store user data if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }

        // Store authentication token
        localStorage.setItem('authToken', generateToken(username));
        localStorage.setItem('username', username);

        // Redirect to main app after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        // Failed login
        errorMessage.style.display = 'block';
        errorMessage.textContent = '✗ Invalid username or password';
    }
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}

function clearMessages() {
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

function generateToken(username) {
    // Simple token generation (replace with actual JWT in production)
    return btoa(username + ':' + Date.now());
}

// Check if user is already logged in
function checkAuthentication() {
    const token = localStorage.getItem('authToken');
    if (token) {
        // User is logged in, redirect to index.html
        window.location.href = 'index.html';
    }
}

// Populate remembered username on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('rememberMe').checked = true;
    }
});

// Demo credentials hint (remove in production)
console.log('Demo Credentials:');
console.log('Username: admin | Password: password123');
console.log('Username: user | Password: user1234');
console.log('Username: demo | Password: demo123');
