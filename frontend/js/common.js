// Common JavaScript functions for EventBright

// Google Analytics (replace with your tracking ID)
const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Replace with actual tracking ID

// Initialize Google Analytics
if (typeof gtag !== 'undefined') {
  gtag('config', GA_TRACKING_ID);
}

// Check authentication status
async function checkAuth() {
  try {
    const res = await fetch('http://localhost:5000/api/auth/me', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      return data.user;
    }
  } catch (err) {
    console.error('Auth check failed:', err);
  }
  return null;
}

// Update auth buttons based on login status
async function updateAuthButtons() {
  const user = await checkAuth();
  const loginBtn = document.querySelector('.btn-login');
  const signupBtn = document.querySelector('.btn-signup');
  
  if (user && loginBtn && signupBtn) {
    loginBtn.textContent = user.name || 'Account';
    loginBtn.href = '#';
    signupBtn.textContent = 'Logout';
    signupBtn.onclick = async (e) => {
      e.preventDefault();
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      window.location.reload();
    };
  } else if (loginBtn && signupBtn) {
    loginBtn.href = 'auth.html';
    signupBtn.href = 'auth.html';
  }
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return 'Date TBA';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateStr;
  }
}

// Format price
function formatPrice(price) {
  if (!price || price === 0) return 'Free';
  return `$${parseFloat(price).toFixed(2)}`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateAuthButtons();
});
