// Login functionality for services page
document.addEventListener('DOMContentLoaded', function() {
    // Check if login form exists
    const loginForm = document.getElementById('serviceLoginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch('http://localhost:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (data.success) {
                    alert('Login successful! Redirecting to services dashboard...');
                    // Redirect to services dashboard or enable premium features
                    localStorage.setItem('loggedIn', 'true');
                    window.location.href = 'services-dashboard.html';
                } else {
                    document.getElementById('loginMessage').textContent = 'Invalid username or password. Please try again.';
                    document.getElementById('loginMessage').classList.add('text-danger');
                }
            } catch (error) {
                console.error('Login error:', error);
                document.getElementById('loginMessage').textContent = 'Server error. Please try again later.';
                document.getElementById('loginMessage').classList.add('text-danger');
            }
        });
    }
    
    // Check if premium service buttons exist
    const premiumButtons = document.querySelectorAll('.premium-service-btn');
    
    if (premiumButtons.length > 0) {
        premiumButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Check if user is logged in
                const isLoggedIn = localStorage.getItem('loggedIn');
                
                if (isLoggedIn === 'true') {
                    // Allow access to premium service
                    const serviceName = this.getAttribute('data-service');
                    window.location.href = `premium-${serviceName}.html`;
                } else {
                    // Show login modal
                    $('#loginModal').modal('show');
                }
            });
        });
    }
    
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
});

// Function to handle service subscription
function subscribeToService(serviceId) {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn');
    
    if (isLoggedIn !== 'true') {
        $('#loginModal').modal('show');
        return;
    }
    
    // Here you would typically make an API call to subscribe the user
    // For now, we'll just show a confirmation message
    alert(`You have successfully subscribed to service #${serviceId}`);
}

// Function to toggle service details
function toggleServiceDetails(elementId) {
    const detailsElement = document.getElementById(elementId);
    
    if (detailsElement) {
        if (detailsElement.style.display === 'none' || !detailsElement.style.display) {
            detailsElement.style.display = 'block';
            document.querySelector(`[onclick="toggleServiceDetails('${elementId}')"]`).textContent = 'Show Less';
        } else {
            detailsElement.style.display = 'none';
            document.querySelector(`[onclick="toggleServiceDetails('${elementId}')"]`).textContent = 'Learn More';
        }
    }
}