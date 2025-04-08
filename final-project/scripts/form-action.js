import { setCurrentYear, setLastModifiedDate, setupHamburgerMenu } from './util.js';

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the footer with the current year and last modified date
  setCurrentYear();
  setLastModifiedDate();

  // Initialize the hamburger menu functionality
  setupHamburgerMenu();
});


// display-form-data.js
function getFormData() {
    const params = new URLSearchParams(window.location.search);
  
    // Extract required field values from the URL
    const firstName = params.get('fname') || 'N/A';
    const lastName = params.get('lname') || 'N/A';
    const email = params.get('email') || 'N/A';
  
    // Build a display message with the submitted form data
    const message = `
      <p class="submittedInfo"><strong>First Name:</strong> ${firstName}</p>
      <p class="submittedInfo"><strong>Last Name:</strong> ${lastName}</p>
      <p class="submittedInfo"><strong>Email:</strong> ${email}</p>
    `;
  
    // Inject the message into the HTML element with the id "output"
    document.getElementById("output").innerHTML = message;
};

// Trigger the function on page load
window.addEventListener('DOMContentLoaded', getFormData);
