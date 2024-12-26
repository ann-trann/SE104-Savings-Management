
// Function to handle logout
function logout() {
    // Clear cookies
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Clear localStorage
    localStorage.clear();
    // Redirect to login
    window.location.href = '/SE104-Savings-Management/index.php"';
}